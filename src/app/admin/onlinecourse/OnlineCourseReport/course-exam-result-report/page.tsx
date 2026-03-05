"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseExamResultReport() {
    return (
        <ReportPage
            title="Course Exam Result Report"
            description="Exam results and scores of students"
            apiUrl="/api/online-course/question"
            columns={[
                { key: "question", label: "Question" },
                { key: "type", label: "Type" },
                { key: "level", label: "Level" },
                { key: "subject", label: "Subject" },
                { key: "answer", label: "Correct Answer" },
            ]}
            transformRow={(row) => ({
                question: row.question,
                type: (row.type || "").replace("_", " "),
                level: row.level || "-",
                subject: row.subject || row.questionTag || "-",
                answer: row.answer || "-",
            })}
        />
    );
}
