import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import OnlineCourse from "@/models/OnlineCourse";
// Import related models so Mongoose registers their schemas before populate() runs
import Class from "@/models/Class";
import Section from "@/models/Section";
import "@/models/Staff";
import "@/models/CourseCategory";

function cleanObjectIds(obj: any) {
    if (!obj) return;
    const fields = ['class', 'assignTeacher', 'category'];
    for (const field of fields) {
        if (obj[field] === "") {
            obj[field] = null;
        }
    }
    if (obj.sections === "") {
        obj.sections = [];
    } else if (Array.isArray(obj.sections)) {
        obj.sections = obj.sections.filter((s: any) => s !== "");
    }
}


export async function GET() {
    try {
        await dbConnect();
        const courses = await OnlineCourse.find()
            .populate("category")
            .populate({ path: "class" })
            .populate({ path: "sections" })
            .populate({ path: "assignTeacher" })
            .sort({ created_at: -1 });
        return NextResponse.json(courses);
    } catch (error: any) {
        console.error("GET /api/online-course error:", error);
        return NextResponse.json({ error: "Failed to fetch courses", detail: error?.message }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        cleanObjectIds(body);
        const course = await OnlineCourse.create(body);

        // 🔔 Fire push notification to affected class/sections
        if (body.class) {
            // Run in background so it doesn't block the API response
            (async () => {
                try {
                    const classObj = await Class.findById(body.class);
                    if (classObj) {
                        const targetClass = classObj.name;
                        const { sendNotificationToStudents } = await import("@/lib/fcm");
                        const { default: Notification } = await import("@/models/Notification");

                        const title = "🎓 New Course Added";
                        const message = `A new course "${body.title}" has been published for you.`;
                        const route = "/lms";

                        if (body.sections && Array.isArray(body.sections) && body.sections.length > 0) {
                            const sectionsObj = await Section.find({ _id: { $in: body.sections } });
                            for (const sec of sectionsObj) {
                                const targetSection = sec.name;
                                const { tokens } = await sendNotificationToStudents({
                                    targetType: "section",
                                    targetClass,
                                    targetSection,
                                    payload: {
                                        title,
                                        body: message,
                                        data: {
                                            type: "course",
                                            route,
                                            title,
                                            body: message,
                                        },
                                    },
                                });

                                await Notification.create({
                                    title,
                                    message,
                                    type: "course",
                                    route,
                                    targetType: "section",
                                    targetClass,
                                    targetSection,
                                    sentBy: "system",
                                    recipientCount: tokens.length,
                                    readBy: [],
                                });
                            }
                        } else {
                            // Class wide
                            const { tokens } = await sendNotificationToStudents({
                                targetType: "class",
                                targetClass,
                                payload: {
                                    title,
                                    body: message,
                                    data: {
                                        type: "course",
                                        route,
                                        title,
                                        body: message,
                                    },
                                },
                            });

                            await Notification.create({
                                title,
                                message,
                                type: "course",
                                route,
                                targetType: "class",
                                targetClass,
                                sentBy: "system",
                                recipientCount: tokens.length,
                                readBy: [],
                            });
                        }
                    }
                } catch (err) {
                    console.error("Failed to send online course notification:", err);
                }
            })();
        } else {
            // General notification (all students)
            (async () => {
                try {
                    const { sendNotificationToStudents } = await import("@/lib/fcm");
                    const { default: Notification } = await import("@/models/Notification");

                    const title = "🎓 New Course Added";
                    const message = `A new course "${body.title}" has been published.`;
                    const route = "/lms";

                    const { tokens } = await sendNotificationToStudents({
                        targetType: "all",
                        payload: {
                            title,
                            body: message,
                            data: {
                                type: "course",
                                route,
                                title,
                                body: message,
                            },
                        },
                    });

                    await Notification.create({
                        title,
                        message,
                        type: "course",
                        route,
                        targetType: "all",
                        sentBy: "system",
                        recipientCount: tokens.length,
                        readBy: [],
                    });
                } catch (err) {
                    console.error("Failed to send general online course notification:", err);
                }
            })();
        }

        return NextResponse.json(course, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to create course" }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        await dbConnect();
        const body = await req.json();
        const { _id, ...updateData } = body;
        if (!_id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        cleanObjectIds(updateData);

        // If we are updating curriculum, use findById and save() to prevent Mongoose subdocument duplication issues
        if (updateData.curriculum) {
            const course = await OnlineCourse.findById(_id);
            if (!course) return NextResponse.json({ error: "Not found" }, { status: 404 });
            course.curriculum = updateData.curriculum;
            const updated = await course.save();
            return NextResponse.json(updated);
        }

        const updated = await OnlineCourse.findByIdAndUpdate(_id, updateData, { new: true });
        if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
        return NextResponse.json(updated);
    } catch (error: any) {
        return NextResponse.json({ error: error.message || "Failed to update course" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");
        if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
        await OnlineCourse.findByIdAndDelete(id);
        return NextResponse.json({ message: "Course deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete course" }, { status: 500 });
    }
}
