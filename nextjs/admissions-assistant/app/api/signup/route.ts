import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = 'init-cluster'

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Username and password required.' }, { status: 400 });
        }

        const client = new MongoClient(uri);
        await client.connect();
        const db = client.db(dbName);
        const users = db.collection('users');

        const existingUser = await users.findOne({ username });
        if (existingUser) {
            await client.close();
            return NextResponse.json({ error: 'Username already exists.' }, { status: 409 });
        }

        await users.insertOne({ username, password }); // In production, hash the password!
        await client.close();

        return NextResponse.json({ message: 'User created successfully.' }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
    }
}