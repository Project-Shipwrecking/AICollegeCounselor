"use server"

import { NextRequest } from 'next/server'
import React from 'react'
import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import { v4 } from 'uuid';

const uri = process.env.MONGODB_URI as string;
const dbName = 'init-cluster'

export async function GET(req: NextRequest) {
    
}
export async function POST(req: NextRequest) {}
export async function PUT(req: NextRequest) { /* ... */ }
export async function PATCH(req: NextRequest) { /* ... */ }
export async function DELETE(req: NextRequest) { /* ... */ }
export async function OPTIONS(req: NextRequest) { /* ... */ }
export async function HEAD(req: NextRequest) { /* ... */ }