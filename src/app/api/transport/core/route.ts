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
        else if (type === "pickup") {
            data = await TransportPickupPoint.find({}).sort({ name: 1 }).lean();
            if (!data || data.length === 0) {
                const defaultPickups = [
                    { name: "Brooklyn North", latitude: "23.21953720694318", longitude: "79.92068396109676" },
                    { name: "Brooklyn South", latitude: "23.204781722973813", longitude: "79.89751486729702" },
                    { name: "Brooklyn West", latitude: "23.19324172886614", longitude: "79.91536320113687" },
                    { name: "Brooklyn East", latitude: "23.193952567195506", longitude: "79.9243812546212" },
                    { name: "Brooklyn Central", latitude: "23.212304949598826", longitude: "79.92914139397962" },
                    { name: "Manhattan", latitude: "23.2066336875236", longitude: "80.00451042401824" },
                    { name: "Railway Station", latitude: "23.16662749489289", longitude: "79.95054096414184" },
                    { name: "High Court", latitude: "23.168615566293845", longitude: "79.94726999887004" },
                    { name: "civil Line", latitude: "23.166120045559563", longitude: "79.95531910260692" },
                    { name: "Vijay Nagar", latitude: "23.190170327286868", longitude: "79.89643280559972" },
                    { name: "Ranital Chowk", latitude: "23.170504563243085", longitude: "79.92385377983044" }
                ];
                await TransportPickupPoint.insertMany(defaultPickups);
                data = await TransportPickupPoint.find({}).sort({ name: 1 }).lean();
            }
        }
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
