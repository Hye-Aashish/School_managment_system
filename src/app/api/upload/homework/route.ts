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

        // Validate file type
        const allowedTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp",
            "image/gif",
            "application/pdf",
            "application/msword",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            "text/plain"
        ];
        
        if (!allowedTypes.includes(file.type)) {
            // Also fallback to check file extension in case content-type is generic/missing
            const extension = file.name.split(".").pop()?.toLowerCase();
            const allowedExts = ["jpg", "jpeg", "png", "webp", "gif", "pdf", "doc", "docx", "txt"];
            if (!extension || !allowedExts.includes(extension)) {
                return NextResponse.json({ error: "Invalid file type. Allowed: Images, PDF, Word, TXT docs" }, { status: 400 });
            }
        }

        // Validate file size (max 10MB)
        const maxSize = 10 * 1024 * 1024;
        if (file.size > maxSize) {
            return NextResponse.json({ error: "File too large. Max size is 10MB" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Generate a unique filename
        const ext = file.name.split(".").pop() || "bin";
        const uniqueName = `homework_${Date.now()}_${Math.random().toString(36).substring(2, 8)}.${ext}`;

        // Ensure directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads", "homework");
        await mkdir(uploadDir, { recursive: true });

        // Write the file
        const filePath = path.join(uploadDir, uniqueName);
        await writeFile(filePath, buffer);

        // Return the public URL
        const publicUrl = `/uploads/homework/${uniqueName}`;
        return NextResponse.json({ url: publicUrl, name: file.name }, { status: 200 });
    } catch (error: any) {
        console.error("Homework upload error:", error);
        return NextResponse.json({ error: error.message || "Upload failed" }, { status: 500 });
    }
}
