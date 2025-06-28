import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
  try {
    await client.connect();
    const db = client.db("init-cluster");

    let page = 1;
    let limit = 25;

    // Parse page from request body if present
    try {
      // GET requests typically do not have a JSON body; this is not standard practice.
      // You should use query parameters instead for GET requests.
      const { searchParams } = new URL(req.url);
      const pageParam = searchParams.get("page");
      const limitParam = searchParams.get("limit");
      const body: any = {};
      if (pageParam) body.page = Number(pageParam);
      if (limitParam) body.limit = Number(limitParam);
      if (body && typeof body.page === "number" && body.page > 0) {
        page = body.page;
      }
      if (body && typeof body.limit === "number" && body.limit > 0) {
        limit = body.limit;
      }
    } catch {
      // Ignore JSON parse errors, use defaults
    }

    const skip = (page - 1) * limit;

    const colleges = await db
      .collection("colleges")
      .find({})
      .sort({ "college.usNewsRanking": 1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json(colleges);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch colleges" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
