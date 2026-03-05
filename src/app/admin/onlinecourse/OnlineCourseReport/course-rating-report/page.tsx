"use client";
import ReportPage from "@/components/online-course/ReportPage";

export default function CourseRatingReport() {
    return (
        <ReportPage
            title="Course Rating Report"
            description="Student ratings and feedback for each course"
            apiUrl="/api/online-course/category"
            columns={[
                { key: "name", label: "Course Name" },
                { key: "rating", label: "Average Rating" },
                { key: "reviews", label: "Total Reviews" },
                { key: "status", label: "Status" },
            ]}
            transformRow={(row, i) => ({
                name: row.name || `Course ${i + 1}`,
                rating: row.rating ?? "-",
                reviews: row.reviews ?? "-",
                status: row.status || "Active",
            })}
        />
    );
}
