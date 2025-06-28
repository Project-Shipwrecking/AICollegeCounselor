import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

// Accepts POST request from the user and adds it to the college data queue to be manually checked by an admin
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token || !token.sub || !token.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();

    data.user = {
      id: token.sub,
      username: token.name,
    };

    // init a database
    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("college_queue");
    await collection.insertOne(data);
    await client.close();

    return NextResponse.json(
      { message: "College data received", data },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
