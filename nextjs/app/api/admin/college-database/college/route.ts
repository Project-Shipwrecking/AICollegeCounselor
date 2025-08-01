import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

// Accepts POST request from the admin and adds it to the college database
export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        // init a database
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('colleges');
        await collection.updateOne(
            { id: data.id },
            { $set: data },
            { upsert: true }
        );
        await client.close();

        return NextResponse.json({ message: 'College data received', data }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}