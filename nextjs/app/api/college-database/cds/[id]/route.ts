import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getToken } from "next-auth/jwt"
import { v4 } from 'uuid';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');
        if (!id) {
            return NextResponse.json({ error: 'Missing id parameter' }, { status: 400 });
        }

        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('cds_queue');
        const cds = await collection.findOne({ id });

        await client.close();

        if (!cds) {
            return NextResponse.json({ error: 'CDS not found' }, { status: 404 });
        }

        return NextResponse.json({ data: cds }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}