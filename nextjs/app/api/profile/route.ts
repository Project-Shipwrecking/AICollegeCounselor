import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { getToken } from "next-auth/jwt";

const uri = process.env.MONGODB_URI as string;
const db = process.env.MONGODB_DB as string;
const client = new MongoClient(uri);

export async function GET(request: Request) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  //   const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  const database = client.db(db);
  const profile = await database
    .collection("users")
    .findOne({ userId: token.sub });

  if (profile && profile.password) {
    // Remove password from profile before returning
    const { password, ...profileWithoutPassword } = profile;
    return NextResponse.json(profileWithoutPassword);
  }

  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }

  return NextResponse.json(profile);
}

export async function POST(request: Request) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  if (!data) {
    return NextResponse.json(
      { error: "Profile data is required" },
      { status: 400 }
    );
  }

  await client.connect();
  const database = client.db(db);

  const profile = await request.json();

  await database
    .collection("users")
    .updateOne({ id: token.sub }, { $set: profile }, { upsert: true });
  await client.close();
  return NextResponse.json(
    { message: "Profile updated successfully" },
    { status: 200 }
  );
}

/**
 * @description Updates the user's profile.profile with the provided data.
 * @param request
 * @returns
 */
export async function PATCH(request: Request) {
  const token = await getToken({ req: request, secret: process.env.AUTH_SECRET });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  if (!data) {
    return NextResponse.json(
      { error: "Profile data is required" },
      { status: 400 }
    );
  }

  await client.connect();
  const database = client.db(db);
  const profile = await database
    .collection("users")
    .findOne({ id: token.sub });
  if (!profile) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  await database.collection("users").updateOne(
    { id: token.sub },
    {
      $set: {
        ...profile,
        profile: {
          ...profile.profile,
          ...data,
        },
      },
    }
  );
  console.log(await database
    .collection("users")
    .findOne({ id: token.sub }));
  await client.close();

  return NextResponse.json(
    { message: "Profile updated successfully" },
    { status: 200 }
  );
}
