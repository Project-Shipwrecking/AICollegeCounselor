import { auth } from "@/auth";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string; // Set your MongoDB Atlas URI in .env.local
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  const session = await auth();

  await client.connect();
  const db = client.db("init-cluster"); // Replace with your DB name
  const users = db.collection("users");
  
  if(!session?.user?.id) {
    return NextResponse.json(false)
  }

  const user = await users.findOne({ id: session?.user?.id });
  
  if(!user) return false;
  const isAdmin = user.admin === true;

  return NextResponse.json(isAdmin);
}
