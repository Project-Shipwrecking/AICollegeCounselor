import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { auth } from "@/auth";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

type ApproveReqBody = {
    id: string,
    edit: boolean,
    edits: any
}

export async function POST(req: NextRequest) {
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
  const data: ApproveReqBody = await req.json();
  let doc = await collection.findOne({ id: data.id });

  if(data.edit) {
    doc = {
        ...doc,
        ...data.edits
    }
  }

  if(doc)
  {
    await db.collection("cds").insertOne(doc);
    await collection.deleteOne({ id: data.id });
    await client.close();
    return NextResponse.json({ success: true });
  } else {
    await client.close();
    return NextResponse.json({ error: "Unknown id" }, { status: 404 });
  }
}
