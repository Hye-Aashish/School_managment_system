"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseExamReport() {
    return (
        <ReportPage
            title="Course Exam Report"
            description="Summary of all course exams — questions, levels, and types"
            apiUrl="/api/online-course/question"
            columns={[
                { key: "question", label: "Question" },
                { key: "type", label: "Type" },
                { key: "level", label: "Level" },
                { key: "subject", label: "Subject" },
                { key: "options", label: "Options Count" },
                { key: "createdAt", label: "Date" },
            ]}
            transformRow={(row) => ({
                question: row.question,
                type: (row.type || "").replace("_", " "),
                level: row.level || "-",
                subject: row.subject || row.questionTag || "-",
                options: Array.isArray(row.options) ? row.options.length : "-",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
