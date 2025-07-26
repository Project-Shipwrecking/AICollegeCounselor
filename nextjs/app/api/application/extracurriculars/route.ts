"use server";

import { NextRequest } from "next/server";
import React from "react";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";
import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { Extracurriculars, user } from "@/types/user";

const uri = process.env.MONGODB_URI as string;
const dbName = "init-cluster";

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
    const user = await collection.findOne({
      id: token.sub,
    });

    if (!user || !user.application || !user.application.extracurriculars) {
      await client.close();
      return NextResponse.json(
        { error: "No extracurriculars found for this user." },
        { status: 404 }
      );
    }
    await client.close();
    return NextResponse.json(user.application.extracurriculars);
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
    const token = await getToken({ req, secret: process.env.AUTH_SECRET });
    if (!token || !token.sub) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    if (!data || !data.extracurricular) {
      return NextResponse.json(
        { error: "Extracurricular data is required." },
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

    // Update the user's extracurriculars

    const extracurriculars = user.application.extracurriculars || [];

    const exists = extracurriculars.some(
      (extracurricular: Extracurriculars) =>
        extracurricular.id === data.extracurricular.id
    );

    let newExtracurriculars;

    if (exists) {
      newExtracurriculars = extracurriculars.map((extracurricular: Extracurriculars) => {
        if (extracurricular.id === data.extracurricular.id) {
          extracurricular = {
            ...extracurricular,
            ...data.extracurricular,
            id: extracurricular.id, // Ensure the ID remains unchanged
          };
        }
        return extracurricular;
      });
    } else {
        const newExtracurricular = {
            ...data.extracurricular
        };
        newExtracurriculars = [...extracurriculars, newExtracurricular];
    }

    await collection.updateOne(
      { id: token.sub },
      { $set: { "application.extracurriculars": newExtracurriculars } }
    );

    await client.close();
    return NextResponse.json(
      { message: "Extracurriculars updated successfully." },
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

    if (!user || !user.application || !user.application.extracurriculars) {
      await client.close();
      return NextResponse.json(
        { error: "No extracurriculars found for this user." },
        { status: 404 }
      );
    }

    // Remove extracurriculars
    await collection.updateOne(
      { id: token.sub },
      { $set: { "application.extracurriculars": [] } }
    );

    await client.close();
    return NextResponse.json(
      { message: "Extracurriculars deleted successfully." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
