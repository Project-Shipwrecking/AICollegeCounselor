import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { getToken } from "next-auth/jwt"
import { v4 } from 'uuid';

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
        if (!data.name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // Add user info to the data
        data.user = {
            id: token.sub,
            username: token.name
        };

        data.id = v4();

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
        const searchQuery = req.nextUrl.searchParams.get('q');
        
        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection('cds_queue');
        
        let cdsItems;
        if (searchQuery) {
            // Search for items matching the query in the name field
            cdsItems = await collection.find({
            name: { $regex: searchQuery, $options: 'i' }
            }).toArray();
        } else {
            // Get 10 random documents from the collection if no search query
            cdsItems = await collection.aggregate([
            { $sample: { size: 10 } }
            ]).toArray();
        }

        await client.close();

        if (!cdsItems || cdsItems.length === 0) {
            return NextResponse.json({ error: 'No CDS items found' }, { status: 404 });
        }

        return NextResponse.json({ data: cdsItems }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}