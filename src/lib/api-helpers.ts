import { NextRequest, NextResponse } from "next/server";
import { readDb, writeDb } from "@/lib/db";

async function handleGet(listKey: string) {
    const db = readDb();
    return NextResponse.json(db[listKey]);
}

async function handlePost(listKey: string, req: NextRequest) {
    const body = await req.json();
    const db = readDb();
    const newItem = { ...body, id: Date.now().toString() };
    db[listKey].push(newItem);
    writeDb(db);
    return NextResponse.json(newItem, { status: 201 });
}

// Student Categories
export async function GET_categories() { return handleGet("categories"); }
export async function POST_categories(req: NextRequest) { return handlePost("categories", req); }

// Student Houses
export async function GET_houses() { return handleGet("houses"); }
export async function POST_houses(req: NextRequest) { return handlePost("houses", req); }

// Disable Reasons
export async function GET_reasons() { return handleGet("reasons"); }
export async function POST_reasons(req: NextRequest) { return handlePost("reasons", req); }

// Export actual handlers for each path
// These will be separate files in practice, but for efficiency I'll group them here in my thoughts and write them separately if needed.
// Actually, I'll write them separately as requested by Next.js structure.
