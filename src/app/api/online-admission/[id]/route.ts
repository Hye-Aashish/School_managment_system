import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OnlineAdmission from "@/models/OnlineAdmission";

export async function DELETE(
    req: NextRequest,
    { params }: { params: { id: string } }
) {
    await dbConnect();
    const { id } = await params;
    try {
        const deleted = await OnlineAdmission.findOneAndDelete({ reference_no: id });
        if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json({ message: "Admission record deleted successfully" });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
