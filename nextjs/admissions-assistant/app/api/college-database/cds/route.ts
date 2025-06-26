import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getToken } from "next-auth/jwt"

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

// Accepts POST request from the user and adds it to the cds queue to be manually checked by an admin
export async function POST(req: NextRequest) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
        if (!token || !token.sub || !token.name) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await req.json();
        // Validate required fields (e.g., id, name)
        if (!data.id || !data.name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Add user info to the data
        data.user = {
            id: token.sub,
            username: token.name
        };

        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('cds_queue');
        await collection.updateOne(
            { id: data.id },
            { $set: data },
            { upsert: true }
        );
        await client.close();

        return NextResponse.json({ message: 'CDS data received', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}

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