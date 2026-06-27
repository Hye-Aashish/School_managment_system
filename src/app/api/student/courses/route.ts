import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";

// Import all related models explicitly first to prevent Mongoose model registration issues
import "@/models/Class";
import "@/models/Section";
import "@/models/Staff";
import "@/models/CourseCategory";

import OnlineCourse from "@/models/OnlineCourse";
import StudentCourse from "@/models/StudentCourse";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();

        // 1. Authenticate user from session token
        let token = req.cookies.get("auth_token")?.value;
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (!token) {
            return apiResponse.error("Not authenticated", 401);
        }

        let sessionUser: any = null;
        try {
            sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
        } catch (e) {
            return apiResponse.error("Invalid session", 401);
        }

        const studentClass = sessionUser.class;

        // 2. Fetch all online courses targeted to student's class, or all courses
        // (Wait: OnlineCourse model has class as ref, which matches className/class ID)
        let courses = await OnlineCourse.find()
            .populate("category")
            .populate("assignTeacher")
            .populate("class")
            .lean();

        // Filter courses by class name or sections if populated/set
        // Since DB may have ObjectIds or raw strings, let's make filtering robust:
        if (courses.length > 0) {
            courses = courses.filter((c: any) => {
                if (!c.class) return true; // School-wide course
                
                const targetClassId = String(c.class._id || c.class).toLowerCase();
                const targetClassName = String(c.class.name || c.class.className || "").toLowerCase();
                const studentClassStr = String(studentClass).toLowerCase();

                return targetClassId.includes(studentClassStr) || 
                       studentClassStr.includes(targetClassId) ||
                       targetClassName.includes(studentClassStr) || 
                       studentClassStr.includes(targetClassName);
            });
        }

        // 3. Check enrollment from StudentCourse collection
        const enrollments = await StudentCourse.find({ student: sessionUser.id, status: "Active" }).lean();
        const enrolledCourseIds = new Set(enrollments.map(e => e.course.toString()));

        // Merge with enrollment details
        let mappedCourses = courses.map((c: any) => {
            const enrollment = enrollments.find(e => e.course.toString() === c._id.toString());
            const completedItemsCount = enrollment?.completedItems?.length || 0;

            let totalCurriculumItems = 0;
            if (c.curriculum && Array.isArray(c.curriculum)) {
                for (const section of c.curriculum) {
                    if (section.items && Array.isArray(section.items)) {
                        totalCurriculumItems += section.items.length;
                    }
                }
            }

            return {
                id: c._id.toString(),
                title: c.title,
                subject: c.category?.name || "General",
                totalLessons: totalCurriculumItems || 10,
                completedLessons: completedItemsCount,
                isEnrolled: !!enrollment || c.price === 0 || c.freeCourse,
                price: c.price,
                currentPrice: c.currentPrice,
                thumbnailUrl: c.thumbnailUrl || "",
                coursePreviewUrl: c.coursePreviewUrl || "",
                teacher: c.assignTeacher ? `${c.assignTeacher.firstName} ${c.assignTeacher.lastName || ""}`.trim() : "Faculty",
                description: c.courseDescription || "",
                outcomes: c.outcomes || []
            };
        });

        if (mappedCourses.length === 0) {
            // Robust Fallback Courses as required if no data is in DB
            mappedCourses = [
                {
                    id: "mock_course_1",
                    title: "Advanced Mathematics",
                    subject: "Mathematics",
                    totalLessons: 12,
                    completedLessons: 9,
                    isEnrolled: true,
                    price: 499,
                    currentPrice: 299,
                    thumbnailUrl: "https://picsum.photos/seed/math/200/280",
                    coursePreviewUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
                    teacher: "Mr. Sharma",
                    description: "Master high school and pre-college mathematics with our in-depth lectures and problem sets.",
                    outcomes: ["Understand complex calculus", "Solve systems of linear equations", "Apply statistics in real-life scenarios"]
                },
                {
                    id: "mock_course_2",
                    title: "Physics Fundamentals",
                    subject: "Physics",
                    totalLessons: 10,
                    completedLessons: 6,
                    isEnrolled: true,
                    price: 399,
                    currentPrice: 199,
                    thumbnailUrl: "https://picsum.photos/seed/physics/200/280",
                    coursePreviewUrl: "",
                    teacher: "Dr. Verma",
                    description: "Understand the laws of nature and physical systems through visual explanations.",
                    outcomes: ["Apply Newton's Laws of Motion", "Calculate electromagnetism properties", "Analyze thermodynamic processes"]
                },
                {
                    id: "mock_course_3",
                    title: "English Literature",
                    subject: "English",
                    totalLessons: 8,
                    completedLessons: 8,
                    isEnrolled: true,
                    price: 0,
                    currentPrice: 0,
                    thumbnailUrl: "https://picsum.photos/seed/english/200/280",
                    coursePreviewUrl: "",
                    teacher: "Ms. Patel",
                    description: "Explore classic and modern English literature with guided analysis.",
                    outcomes: ["Analyze literary structures", "Identify major themes and motifs", "Write persuasive analytical essays"]
                },
                {
                    id: "mock_course_4",
                    title: "Chemistry Core",
                    subject: "Chemistry",
                    totalLessons: 14,
                    completedLessons: 5,
                    isEnrolled: false,
                    price: 599,
                    currentPrice: 349,
                    thumbnailUrl: "https://picsum.photos/seed/chem/200/280",
                    coursePreviewUrl: "",
                    teacher: "Ms. Nair",
                    description: "Learn core chemical concepts, equations, and elements from scratch.",
                    outcomes: ["Balance complex chemical equations", "Understand the periodic table properties", "Identify organic chemistry structures"]
                }
            ];
        }

        return apiResponse.success(mappedCourses);

    } catch (error: any) {
        console.error("Student Courses GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}
