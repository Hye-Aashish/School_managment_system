import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { TransportRoutePoint, TransportAssignVehicle, TransportFeesMaster } from "@/models/TransportAssignments";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type");
        
        let data;
        if (type === "routePoint") data = await TransportRoutePoint.find({}).lean();
        else if (type === "assignVehicle") data = await TransportAssignVehicle.find({}).lean();
        else if (type === "feesMaster") data = await TransportFeesMaster.find({}).lean();
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
        if (type === "routePoint") data = await TransportRoutePoint.findOneAndUpdate({ route: payload.route }, payload, { upsert: true, new: true });
        else if (type === "assignVehicle") data = await TransportAssignVehicle.findOneAndUpdate({ route: payload.route }, payload, { upsert: true, new: true });
        else if (type === "feesMaster") data = await TransportFeesMaster.findOneAndUpdate({ route: payload.route }, payload, { upsert: true, new: true });
        else return NextResponse.json({ success: false, error: "Invalid type" }, { status: 400 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
