"use server";

import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { MongoClient } from "mongodb";
import { v4 } from "uuid";
import { getToken } from "next-auth/jwt";
import { user } from "@/types/user";

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token || !token.sub || !token.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await client.connect();

    const db = client.db(dbName);
    const collection = db.collection("users");
    const user  = await collection.findOne({
        id: token.sub,
    })

    if(!user || !user.application || !user.application.essays) {
        await client.close();
        return NextResponse.json({ error: "No essays found for this user." }, { status: 404 });
    }
    await client.close();
    return NextResponse.json(user.application.essays);
    
  } catch (error) {
    await client.close();
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
    // upserts a single essay for the user
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        console.log(data);
        if (!data || !data.essay) {
            return NextResponse.json({ error: "Essay data is required." }, { status: 400 });
        }

        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection("users");
        const user = await collection.findOne({
            username: token.name,
        });

        if (!user) {
            await client.close();
            return NextResponse.json({ error: "User not found." }, { status: 404 });
        }

        // Upsert the essay
        await collection.updateOne(
            { id: token.sub },
            // change to push
            { $push: { "application.essays": data.essay } },
            { upsert: true }
        );

        await client.close();
        return NextResponse.json({ message: "Essay added/updated successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
export async function PUT(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        if (!data || !data.essays) {
            return NextResponse.json({ error: "Essays data is required." }, { status: 400 });
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

        // Update the user's essays
        await collection.updateOne(
            { id: token.sub },
            { $set: { "application.essays": data.essays } }
        );

        await client.close();
        return NextResponse.json({ message: "Essays updated successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error updating essays:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.AUTH_SECRET });
        if (!token || !token.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await client.connect();

        const db = client.db(dbName);
        const collection = db.collection("users");
        const user = await collection.findOne({
            id: token.sub,
        });

        if (!user || !user.application || !user.application.essays) {
            await client.close();
            return NextResponse.json({ error: "No essays found for this user." }, { status: 404 });
        }

        await client.close();
        return NextResponse.json({ message: "Essays deleted successfully." }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}