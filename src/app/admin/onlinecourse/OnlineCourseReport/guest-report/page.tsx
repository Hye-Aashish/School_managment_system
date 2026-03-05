"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function GuestReport() {
    return (
        <ReportPage
            title="Guest Report"
            description="Details of guest visits and course previews"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course Name" },
                { key: "guestViews", label: "Guest Views" },
                { key: "status", label: "Status" },
                { key: "createdAt", label: "Date" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || `Course ${i + 1}`,
                guestViews: row.guestViews ?? "-",
                status: row.status || "Active",
                createdAt: row.createdAt ? new Date(row.createdAt).toLocaleDateString() : "-",
            })}
        />
    );
}
