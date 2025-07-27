"use server";
import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";
import { Honors } from "@/types/user";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: "__Secure-authjs.session-token",
    });

    if (!token || !token.sub || !token.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("users");
    const user = await collection.findOne({
      id: token.sub,
    });

    if (!user || !user.application || !user.application.honors) {
      await client.close();
      return NextResponse.json(
        { error: "No honors found for this user." },
        { status: 404 }
      );
    }
    await client.close();
    return NextResponse.json(user.application.honors);
  } catch (error) {
    await client.close();
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: "__Secure-authjs.session-token",
    });

    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    if (!data || !data.honor) {
      return NextResponse.json(
        { error: "Honors data is required." },
        { status: 400 }
      );
    }

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("users");
    const user = await collection.findOne({
      id: token.sub,
    });

    if (!user) {
      await client.close();
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    // Update the user's honors

    const honors = user.application.honors || [];

    const exists = honors.some((h: Honors) => h.id === data.honor.id);

    let newHonors: Honors[] = [];

    if (exists) {
      newHonors = honors.map((h: Honors) =>
        h.id === data.honor.id ? data.honor : h
      );
    } else {
      newHonors = [...honors, data.honor];
    }

    await collection.updateOne(
      { id: token.sub },
      { $set: { "application.honors": newHonors } }
    );

    await client.close();
    return NextResponse.json(
      { message: "Honors updated successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const token = await getToken({
      req: req,
      secret: process.env.NEXTAUTH_SECRET,
      cookieName: "__Secure-authjs.session-token",
    });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("users");
    const user = await collection.findOne({
      id: token.sub,
    });

    if (!user || !user.application || !user.application.honors) {
      await client.close();
      return NextResponse.json(
        { error: "No honors found for this user." },
        { status: 404 }
      );
    }

    // Remove honors
    await collection.updateOne(
      { id: token.sub },
      { $unset: { "application.honors": "" } }
    );

    await client.close();
    return NextResponse.json(
      { message: "Honors deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
