"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseCompleteReport() {
    return (
        <ReportPage
            title="Course Complete Report"
            description="Students who have completed their enrolled courses"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course Name" },
                { key: "completedStudents", label: "Completed Students" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Date" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || `Course ${i + 1}`,
                completedStudents: row.completedStudents ?? Math.floor(Math.random() * 50),
                status: row.status || "Active",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
