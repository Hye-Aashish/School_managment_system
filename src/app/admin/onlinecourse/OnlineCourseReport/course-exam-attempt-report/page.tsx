"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseExamAttemptReport() {
    return (
        <ReportPage
            title="Course Exam Attempt Report"
            description="All exam attempts made by students across courses"
            apiUrl="/api/online-course/question"
            columns={[
                { key: "question", label: "Question" },
                { key: "type", label: "Type" },
                { key: "level", label: "Level" },
                { key: "subject", label: "Subject" },
                { key: "createdAt", label: "Date" },
            ]}
            transformRow={(row) => ({
                question: row.question,
                type: (row.type || "").replace("_", " "),
                level: row.level || "-",
                subject: row.subject || row.questionTag || "-",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
