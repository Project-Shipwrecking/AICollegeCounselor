"use server";

import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    const searchParams = new URL(req.url).searchParams;
    if (!searchParams.has("search")) {
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("essays");
      const essays = await collection
        .find({ id: { $lt: 30 } })
        .sort({ id: 1 })
        .toArray();
      const filteredEssays = essays;
      await client.close();
      return NextResponse.json(filteredEssays);
    }
    if(searchParams.has("search")) {
      const search = searchParams.get("search");
      if (!search) {
        return NextResponse.json(
          { error: "Search query is required." },
          { status: 400 }
        );
      }
      await client.connect();
      const db = client.db(dbName);
      const collection = db.collection("essays");
    const essays = await collection
      .find({
        $or: [
        { name: { $regex: search, $options: "i" } },
        { "school.name": { $regex: search, $options: "i" } }
        ]
      })
      .sort({ id: 1 })
      .toArray();
      await client.close();
      return NextResponse.json(essays);
    }
  } catch (error) {
    await client.close();
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
