import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { TransportRoute, TransportVehicle, TransportPickupPoint } from "@/models/TransportCore";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        
        let data;
        if (type === "route") data = await TransportRoute.find({}).sort({ name: 1 }).lean();
        else if (type === "vehicle") data = await TransportVehicle.find({}).sort({ vehicleNo: 1 }).lean();
        else if (type === "pickup") data = await TransportPickupPoint.find({}).sort({ name: 1 }).lean();
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const { type, ...payload } = body;
        
        let data;
        if (type === "route") data = await TransportRoute.create(payload);
        else if (type === "vehicle") data = await TransportVehicle.create(payload);
        else if (type === "pickup") data = await TransportPickupPoint.create(payload);
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        const type = searchParams.get("type");

        if (type === "route") await TransportRoute.findByIdAndDelete(id);
        else if (type === "vehicle") await TransportVehicle.findByIdAndDelete(id);
        else if (type === "pickup") await TransportPickupPoint.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
