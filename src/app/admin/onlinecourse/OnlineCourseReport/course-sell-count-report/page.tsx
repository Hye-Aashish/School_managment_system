"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseSellCountReport() {
    return (
        <ReportPage
            title="Course Sell Count Report"
            description="Total number of course sales by category"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course Name" },
                { key: "sold", label: "Sold Count" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Date" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || `Course ${i + 1}`,
                sold: row.sold ?? "-",
                status: row.status || "Active",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
