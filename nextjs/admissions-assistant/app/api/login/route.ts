import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI as string; // Set your MongoDB Atlas URI in .env.local
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
        }

        await client.connect();
        const db = client.db('init-cluster'); // Replace with your DB name
        const users = db.collection('users');

        const user = await users.findOne({ username });

        if (!user) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // const passwordMatch = await bcrypt.compare(password, user.password);

        if (user.password !== password) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        // Authentication successful
        return NextResponse.json({ success: true, userId: user._id });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.close();
    }
}