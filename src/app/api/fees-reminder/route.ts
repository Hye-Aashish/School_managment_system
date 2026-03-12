import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import FeeReminder from "@/models/FeeReminder";

export async function GET() {
  await dbConnect();
  try {
    let reminders = await FeeReminder.find().lean();
    
    // Seed if empty
    if (reminders.length === 0) {
      const defaultReminders = [
        { reminderType: 'Before', days: 2, action: false },
        { reminderType: 'Before', days: 5, action: false },
        { reminderType: 'After', days: 2, action: false },
        { reminderType: 'After', days: 5, action: false },
      ];
      await FeeReminder.insertMany(defaultReminders);
      reminders = await FeeReminder.find().lean();
    }
    
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("FeeReminder GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Bulk update or create
export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json();
    
    // Case 1: Bulk update/create (Array)
    if (Array.isArray(body)) {
      const updatePromises = body.map((reminder) => {
        if (reminder._id) {
          return FeeReminder.findByIdAndUpdate(reminder._id, {
            action: reminder.action,
            days: reminder.days,
            reminderType: reminder.reminderType
          }, { new: true });
        } else {
          return FeeReminder.create(reminder);
        }
      });
      const results = await Promise.all(updatePromises);
      return NextResponse.json(results);
    }
    
    // Case 2: Single create (Object)
    if (typeof body === 'object' && body !== null) {
      const newReminder = await FeeReminder.create(body);
      return NextResponse.json(newReminder, { status: 201 });
    }

    return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
  } catch (error: any) {
    console.error("FeeReminder POST Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await dbConnect();
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return NextResponse.json({ error: "Missing ID" }, { status: 400 });
    }

    await FeeReminder.findByIdAndDelete(id);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error: any) {
    console.error("FeeReminder DELETE Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
