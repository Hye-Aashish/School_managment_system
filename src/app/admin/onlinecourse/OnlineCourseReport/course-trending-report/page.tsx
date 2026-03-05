"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseTrendingReport() {
    return (
        <ReportPage
            title="Course Trending Report"
            description="Most popular and trending courses based on enrollment"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course Name" },
                { key: "enrollments", label: "Total Enrollments" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Created At" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || `Course ${i + 1}`,
                enrollments: row.enrollments ?? "-",
                status: row.status || "Active",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
