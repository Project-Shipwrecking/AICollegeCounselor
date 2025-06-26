import { NextRequest, NextResponse } from 'next/server';
import { auth } from '../../../../../auth'
import { MongoClient } from 'mongodb';
g

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

// Accepts POST request from the admin and adds it to the cds database
export async function POST(req: NextRequest) {
    try {
        // Check if the user is authenticated and is an admin
        const session = await (global as any).getServerSession?.();
        if (!session || !session.user || !session.user.isAdmin) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }
        const data = await req.json();
        // init a database
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('cds');
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
};


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