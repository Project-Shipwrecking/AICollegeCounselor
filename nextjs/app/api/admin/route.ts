import { auth } from "@/auth";
import { MongoClient } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

const uri = process.env.MONGODB_URI as string; // Set your MongoDB Atlas URI in .env.local
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  console.log("Checking admin status...");
  const session = await auth();


  await client.connect();
  const db = client.db("init-cluster"); // Replace with your DB name
  const users = db.collection("users");
  
  if(!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const user = await users.findOne({ username: session.user.name });
  
  if(!user) return NextResponse.json(false);
  console.log("User found:", user);
  const isAdmin = user.admin === true;

  return NextResponse.json(isAdmin);
}
