"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function StudentCoursePurchaseReport() {
    return (
        <ReportPage
            title="Student Course Purchase Report"
            description="All course purchase transactions by students"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course / Category Name" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Purchase Date" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || row.courseName || `Course ${i + 1}`,
                status: row.status || "Active",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
