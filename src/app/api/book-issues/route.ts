import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import BookIssue from "@/models/BookIssue";
import Book from "@/models/Book";

export async function GET(req: NextRequest) {
    await dbConnect();
    try {
        const { searchParams } = new URL(req.url);
        const memberId = searchParams.get("memberId");

        let query: any = {};
        if (memberId) query.memberId = memberId;

        const issues = await BookIssue.find(query).sort({ created_at: -1 }).lean();
        return NextResponse.json({ success: true, data: issues });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const book = await Book.findOne({ bookNo: body.bookId });

        if (!book || book.availableQty <= 0) {
            return NextResponse.json({ success: false, error: "Book unavailable or not found" }, { status: 400 });
        }

        const issue = await BookIssue.create(body);

        // Decrement available qty
        await Book.findByIdAndUpdate(book._id, { $inc: { availableQty: -1 } });

        // 🔔 Fire push notification to student
        if (body.memberType === "Student") {
            (async () => {
                try {
                    const { sendNotificationToStudents } = await import("@/lib/fcm");
                    const { default: Notification } = await import("@/models/Notification");
                    const { default: Student } = await import("@/models/Student");

                    // Find student (check raw admission number or mapped member ID)
                    let student = await Student.findOne({ admission_no: body.memberId });
                    if (!student) {
                        const mockMapping: { [key: string]: string } = {
                            "57": "120020",
                            "52": "18001",
                            "53": "125005",
                            "54": "10024",
                            "56": "659990"
                        };
                        const mappedAdmissionNo = mockMapping[body.memberId];
                        if (mappedAdmissionNo) {
                            student = await Student.findOne({ admission_no: mappedAdmissionNo });
                        }
                    }

                    if (student) {
                        const title = "📚 Library Book Issued";
                        const message = `You have been issued "${book.title}". Please return it by ${body.returnDate}.`;
                        const route = "/library";

                        const { tokens } = await sendNotificationToStudents({
                            targetType: "student",
                            targetAdmissionNo: student.admission_no,
                            payload: {
                                title,
                                body: message,
                                data: {
                                    type: "library",
                                    route,
                                    title,
                                    body: message,
                                },
                            },
                        });

                        await Notification.create({
                            title,
                            message,
                            type: "library",
                            route,
                            targetType: "student",
                            targetAdmissionNo: student.admission_no,
                            sentBy: "system",
                            recipientCount: tokens.length,
                            readBy: [],
                        });
                    }
                } catch (err) {
                    console.error("Failed to send book issue notification:", err);
                }
            })();
        }

        return NextResponse.json({ success: true, data: issue });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    await dbConnect();
    try {
        const { id, actualReturnDate } = await req.json();
        const issue = await BookIssue.findById(id);
        if (!issue || issue.status === "Returned") return NextResponse.json({ success: false, error: "Invalid issue record" });

        const updatedIssue = await BookIssue.findByIdAndUpdate(id, {
            status: "Returned",
            actualReturnDate
        }, { new: true });

        // Increment available qty
        const book = await Book.findOne({ bookNo: issue.bookId });
        if (book) {
            await Book.findByIdAndUpdate(book._id, { $inc: { availableQty: 1 } });
        }

        // 🔔 Fire push notification to student
        if (issue.memberType === "Student") {
            (async () => {
                try {
                    const { sendNotificationToStudents } = await import("@/lib/fcm");
                    const { default: Notification } = await import("@/models/Notification");
                    const { default: Student } = await import("@/models/Student");

                    // Find student (check raw admission number or mapped member ID)
                    let student = await Student.findOne({ admission_no: issue.memberId });
                    if (!student) {
                        const mockMapping: { [key: string]: string } = {
                            "57": "120020",
                            "52": "18001",
                            "53": "125005",
                            "54": "10024",
                            "56": "659990"
                        };
                        const mappedAdmissionNo = mockMapping[issue.memberId];
                        if (mappedAdmissionNo) {
                            student = await Student.findOne({ admission_no: mappedAdmissionNo });
                        }
                    }

                    if (student) {
                        const bookTitle = book ? book.title : issue.bookId;
                        const title = "📚 Library Book Returned";
                        const message = `The book "${bookTitle}" has been successfully returned.`;
                        const route = "/library";

                        const { tokens } = await sendNotificationToStudents({
                            targetType: "student",
                            targetAdmissionNo: student.admission_no,
                            payload: {
                                title,
                                body: message,
                                data: {
                                    type: "library",
                                    route,
                                    title,
                                    body: message,
                                },
                            },
                        });

                        await Notification.create({
                            title,
                            message,
                            type: "library",
                            route,
                            targetType: "student",
                            targetAdmissionNo: student.admission_no,
                            sentBy: "system",
                            recipientCount: tokens.length,
                            readBy: [],
                        });
                    }
                } catch (err) {
                    console.error("Failed to send book return notification:", err);
                }
            })();
        }

        return NextResponse.json({ success: true, data: updatedIssue });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}
