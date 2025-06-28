import { NextRequest, NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';

const uri = process.env.MONGODB_URI as string; // Set your MongoDB Atlas URI in .env.local
const client = new MongoClient(uri);

export async function POST(req: NextRequest) {
    try {
        const { username, password } = await req.json();
        console.log(username + " " + password)

        if (!username || !password) {
            return NextResponse.json({ error: 'Missing username or password' }, { status: 400 });
        }

        await client.connect();
        const db = client.db('init-cluster'); // Replace with your DB name
        const users = db.collection('users');

        const user = await users.findOne({ username });

        console.log(user)

        if (!user) {

            return NextResponse.json({ error: 'Unable to find a user with that username!' }, { status: 401 });
        }

        console.log(password)
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return NextResponse.json({ error: 'The password is incorrect!' }, { status: 401 });
        }

        // Authentication successful
        return NextResponse.json({ success: true, ...user });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    } finally {
        await client.close();
    }
}