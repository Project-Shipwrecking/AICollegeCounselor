import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/auth";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

// For the Admin, returns the 10 oldest requests in the queue
export async function GET(req: NextRequest) {
  // const data = await req.json();
  const session = await auth();

  await client.connect();
  const db = client.db(dbName);

  const users = db.collection("users");
  if (!session?.user?.id) {
    await client.close();
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await users.findOne({ id: session?.user?.id });

  if (!user)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const collection = db.collection("cds_queue");
  const docs = await collection.find({}).sort({ id: 1 }).limit(10).toArray();

  await client.close();
  return NextResponse.json(docs);
}
