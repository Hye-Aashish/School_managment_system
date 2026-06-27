import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";
import dbConnect from "@/lib/mongodb";
import { apiResponse } from "@/lib/response";
import OnlineCourse from "@/models/OnlineCourse";
import Lesson from "@/models/Lesson";
import DownloadContent from "@/models/DownloadContent";

import StudentCourse from "@/models/StudentCourse";

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        if (!courseId) {
            return apiResponse.badRequest("courseId is required");
        }

        // 1. Fetch course details
        const course = await OnlineCourse.findById(courseId).populate("category").lean();
        if (!course && !courseId.startsWith("mock_")) {
            return apiResponse.notFound("Course");
        }

        // 2. Fetch completed items for student if authenticated
        let token = req.cookies.get("auth_token")?.value;
        if (!token) {
            const authHeader = req.headers.get("authorization");
            if (authHeader && authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        let completedItemIds = new Set<string>();
        if (token) {
            try {
                const sessionUser = JSON.parse(Buffer.from(token, "base64").toString("utf-8"));
                if (sessionUser && sessionUser.id) {
                    const enrollment = await StudentCourse.findOne({ student: sessionUser.id, course: courseId }).lean();
                    if (enrollment && enrollment.completedItems) {
                        completedItemIds = new Set(enrollment.completedItems);
                    }
                }
            } catch (e) {
                console.error("Fallback auth error:", e);
            }
        }

        // 3. Fetch lessons/resources from fallback collections if real curriculum is empty
        let lessons: any[] = [];
        let resources: any[] = [];
        let mappedLessons: any[] = [];
        let mappedResources: any[] = [];

        if (course && course.curriculum && course.curriculum.length > 0) {
            // Map from real curriculum
            for (const section of course.curriculum) {
                if (section.items && Array.isArray(section.items)) {
                    for (const item of section.items) {
                        const itemId = item._id ? item._id.toString() : "";
                        const isCompleted = completedItemIds.has(itemId);

                        mappedLessons.push({
                            id: itemId,
                            title: item.title,
                            duration: item.duration || "15 min",
                            isCompleted,
                            resourceUrl: item.type === "video" ? item.videoUrl : (item.contentUrl || ""),
                            type: item.type,
                            videoProvider: item.videoProvider || "Youtube",
                            questions: item.questions || [],
                            assignmentDesc: item.assignmentDesc || "",
                            assignmentUrl: item.assignmentUrl || "",
                            contentBody: item.contentBody || "",
                            contentUrl: item.contentUrl || ""
                        });

                        if (item.type === "assignment" && item.assignmentUrl) {
                            mappedResources.push({
                                id: itemId,
                                title: item.title,
                                desc: item.assignmentDesc || "Assignment Document",
                                size: "1.2 MB",
                                type: "pdf",
                                fileUrl: item.assignmentUrl
                            });
                        } else if (item.type === "content" && item.contentUrl) {
                            mappedResources.push({
                                id: itemId,
                                title: item.title,
                                desc: "Content Resource",
                                size: "1.0 MB",
                                type: "pdf",
                                fileUrl: item.contentUrl
                            });
                        }
                    }
                }
            }
        } else if (course) {
            const className = course.class ? String(course.class) : "";
            const subject = course.category ? (course.category as any).name : "";

            lessons = await Lesson.find({
                class: className,
                subject: subject
            }).lean();

            resources = await DownloadContent.find({
                class: className,
                title: { $regex: subject, $options: "i" }
            }).lean();

            mappedLessons = lessons.map((l: any) => ({
                id: l._id.toString(),
                title: l.name,
                duration: "45 min",
                isCompleted: false,
                resourceUrl: ""
            }));

            mappedResources = resources.map((r: any) => ({
                id: r._id.toString(),
                title: r.title,
                desc: r.description || "PDF Document",
                size: "1.2 MB",
                type: "pdf",
                fileUrl: r.fileUrl || ""
            }));
        }

        // 4. Fallback Mock Lessons and Resources if data is missing or course is mock
        if (mappedLessons.length === 0) {
            let courseTitle = "Course LMS";
            let categoryName = "General";
            if (course) {
                courseTitle = course.title;
                categoryName = course.category ? (course.category as any).name : "General";
            } else if (courseId.startsWith("mock_")) {
                if (courseId === "mock_course_1") { courseTitle = "Advanced Mathematics"; categoryName = "Mathematics"; }
                else if (courseId === "mock_course_2") { courseTitle = "Physics Fundamentals"; categoryName = "Physics"; }
                else if (courseId === "mock_course_3") { courseTitle = "English Literature"; categoryName = "English"; }
                else if (courseId === "mock_course_4") { courseTitle = "Chemistry Core"; categoryName = "Chemistry"; }
            }

            const fallback = getDynamicFallback(courseId, courseTitle, categoryName);
            mappedLessons = fallback.lessons;
            mappedResources = fallback.resources;
        }

        if (mappedResources.length === 0) {
            let courseTitle = course ? course.title : "Course LMS";
            mappedResources = [
                { id: "res_g1", title: `${courseTitle} - Syllabus & Overview`, desc: "PDF Document", size: "2.4 MB", type: "pdf", fileUrl: "https://example.com/syllabus.pdf" },
                { id: "res_g2", title: `${courseTitle} - Reference Handbook`, desc: "PDF Document", size: "3.5 MB", type: "pdf", fileUrl: "https://example.com/notes.pdf" }
            ];
        }

        // 5. Structure curriculum list populated with completed state
        const mappedCurriculum = course && course.curriculum ? course.curriculum.map((section: any) => ({
            id: section._id?.toString() || "",
            title: section.title,
            items: (section.items || []).map((item: any) => ({
                id: item._id?.toString() || "",
                title: item.title,
                type: item.type,
                duration: item.duration || "",
                videoUrl: item.videoUrl || "",
                videoProvider: item.videoProvider || "Youtube",
                questions: item.questions || [],
                assignmentDesc: item.assignmentDesc || "",
                assignmentUrl: item.assignmentUrl || "",
                contentBody: item.contentBody || "",
                contentUrl: item.contentUrl || "",
                isCompleted: completedItemIds.has(item._id?.toString() || "")
            }))
        })) : [];

        return apiResponse.success({
            courseId,
            title: course ? course.title : "Course LMS",
            lessons: mappedLessons,
            resources: mappedResources,
            curriculum: mappedCurriculum
        });

    } catch (error: any) {
        console.error("Course Resources GET Error:", error);
        return apiResponse.error("Internal Server Error", 500, error.message);
    }
}

function getDynamicFallback(courseId: string, courseTitle: string, categoryName: string) {
    const subject = (categoryName || "").toLowerCase();
    const title = courseTitle ? courseTitle.trim() : "Course LMS";

    let lessons: any[] = [];
    let resources: any[] = [];

    // Helper to generate dynamic lessons based on the title and a set of topics
    const generateLessonsForSubject = (topicTemplates: string[], durations: string[]) => {
        return topicTemplates.map((template, idx) => {
            let lessonTitle = template.replace("{title}", title);
            // Capitalize first letter of each word to make it look premium
            lessonTitle = lessonTitle.split(" ").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

            return {
                id: `l_${courseId}_${idx + 1}`,
                title: lessonTitle,
                duration: durations[idx % durations.length],
                isCompleted: idx < 2, // First 2 lessons completed as mock
                resourceUrl: idx === 0 ? "https://www.youtube.com/watch?v=dQw4w9WgXcQ" : ""
            };
        });
    };

    if (courseId === "mock_course_2" || subject.includes("physics") || subject.includes("science")) {
        const templates = [
            "Introduction to Physics in {title}",
            "Fundamental Theories of {title}",
            "Practical Labs & Experimentation on {title}",
            "Advanced Dynamics in {title}"
        ];
        lessons = generateLessonsForSubject(templates, ["45 min", "50 min", "60 min", "55 min"]);
        resources = [
            { id: `res_${courseId}_1`, title: `${title} - Mechanics & Laws Handout`, desc: "PDF Document", size: "1.4 MB", type: "pdf", fileUrl: "https://example.com/mechanics.pdf" },
            { id: `res_${courseId}_2`, title: `${title} - Physics Formula Sheet`, desc: "PDF Document", size: "2.1 MB", type: "pdf", fileUrl: "https://example.com/physics_formulas.pdf" }
        ];
    } else if (courseId === "mock_course_3" || subject.includes("english") || subject.includes("literature") || subject.includes("art")) {
        if (subject.includes("art")) {
            const templates = [
                "Introduction to Art & Design in {title}",
                "Color Theory & Aesthetics of {title}",
                "Composition & Techniques for {title}",
                "Creative Expression in {title}"
            ];
            lessons = generateLessonsForSubject(templates, ["40 min", "45 min", "50 min", "55 min"]);
            resources = [
                { id: `res_${courseId}_1`, title: `${title} - Sketchbook Handout`, desc: "PDF Document", size: "3.2 MB", type: "pdf", fileUrl: "https://example.com/sketchbook.pdf" },
                { id: `res_${courseId}_2`, title: `${title} - Style Reference Guide`, desc: "PDF Document", size: "1.8 MB", type: "pdf", fileUrl: "https://example.com/style.pdf" }
            ];
        } else {
            const templates = [
                "Analysis of Theme in {title}",
                "Grammar & Composition of {title}",
                "Creative Reading & Rhetoric on {title}"
            ];
            lessons = generateLessonsForSubject(templates, ["45 min", "40 min", "50 min"]);
            resources = [
                { id: `res_${courseId}_1`, title: `${title} - Reading Materials`, desc: "PDF Document", size: "1.2 MB", type: "pdf", fileUrl: "https://example.com/reading.pdf" },
                { id: `res_${courseId}_2`, title: `${title} - Essay Writing Guide`, desc: "PDF Document", size: "1.6 MB", type: "pdf", fileUrl: "https://example.com/essay.pdf" }
            ];
        }
    } else if (courseId === "mock_course_4" || subject.includes("chemistry")) {
        const templates = [
            "Core Concepts in {title}",
            "Chemical Bonds & Reactions in {title}",
            "Organic Compounds & Analysis of {title}"
        ];
        lessons = generateLessonsForSubject(templates, ["50 min", "55 min", "60 min"]);
        resources = [
            { id: `res_${courseId}_1`, title: `${title} - Periodic Table Reference`, desc: "PDF Document", size: "1.1 MB", type: "pdf", fileUrl: "https://example.com/periodic.pdf" }
        ];
    } else {
        const templates = [
            "Introduction to {title}",
            "Core Foundations of {title}",
            "Practical Labs & Exercise on {title}",
            "Advanced Applications of {title}"
        ];
        lessons = generateLessonsForSubject(templates, ["45 min", "50 min", "55 min", "60 min"]);
        resources = [
            { id: `res_${courseId}_1`, title: `${title} - Syllabus & Overview`, desc: "PDF Document", size: "2.4 MB", type: "pdf", fileUrl: "https://example.com/syllabus.pdf" },
            { id: `res_${courseId}_2`, title: `${title} - Reference Notebook`, desc: "PDF Document", size: "3.5 MB", type: "pdf", fileUrl: "https://example.com/notes.pdf" }
        ];
    }

    return { lessons, resources };
}
