import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "application/pdf"];
        const extension = file.name.split(".").pop()?.toLowerCase();
        const allowedExts = ["jpg", "jpeg", "png", "webp", "pdf"];
        if (!allowedTypes.includes(file.type) && (!extension || !allowedExts.includes(extension))) {
            return NextResponse.json({ error: "Invalid file type. Allowed: JPG, PNG, WEBP, PDF" }, { status: 400 });
        }

        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            return NextResponse.json({ error: "File too large. Max size is 5MB" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const ext = extension || "jpg";
        const uniqueName = `fee_receipt_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

        const uploadDir = path.join(process.cwd(), "public", "uploads", "fee-receipts");
        await mkdir(uploadDir, { recursive: true });

        const filePath = path.join(uploadDir, uniqueName);
        await writeFile(filePath, buffer);

        const publicUrl = `/uploads/fee-receipts/${uniqueName}`;
        return NextResponse.json({ success: true, url: publicUrl, name: file.name }, { status: 200 });
    } catch (error: any) {
        console.error("Fee receipt upload error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
