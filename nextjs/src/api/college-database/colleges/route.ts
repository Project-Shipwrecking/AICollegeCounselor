import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function GET(req: NextRequest) {
    try {
        await client.connect();
        const db = client.db('college');
        const colleges = await db
            .collection('colleges')
            .find({})
            .sort({ 'college.usNewsRanking': 1 })
            .limit(25)
            .toArray();

        return NextResponse.json(colleges);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch colleges' }, { status: 500 });
    } finally {
        await client.close();
    }
}