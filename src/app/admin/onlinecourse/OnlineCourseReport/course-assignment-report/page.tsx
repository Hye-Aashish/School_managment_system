"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseAssignmentReport() {
    return (
        <ReportPage
            title="Course Assignment Report"
            description="All assignments submitted across enrolled courses"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course Name" },
                { key: "assignments", label: "Total Assignments" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Date" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || `Course ${i + 1}`,
                assignments: row.assignments ?? "-",
                status: row.status || "Active",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
