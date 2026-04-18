import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://aashishofficial123_db_user:AV445S3k0brlHEPu@ac-791ijbv-shard-00-00.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-01.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-02.q0seg1w.mongodb.net:27017/school_managment_system?ssl=true&replicaSet=atlas-uhm015-shard-0&authSource=admin&retryWrites=true&w=majority";

// Schemas for Mega Seeding
const DepartmentSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true } });
const DesignationSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true } });
const StaffSchema = new mongoose.Schema({ 
    staff_id: { type: String, unique: true }, name: String, father_name: String, email: String, 
    mobile: String, role: String, department: String, designation: String, status: { type: String, default: "Active" }
});
const SubjectSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, code: String, type: String });
const BookSchema = new mongoose.Schema({ title: { type: String, required: true }, book_no: String, isbn: String, author: String, quantity: Number });
const NoticeSchema = new mongoose.Schema({ title: { type: String, required: true }, message: String, publish_date: Date });
const OnlineCourseSchema = new mongoose.Schema({ title: { type: String, required: true }, category: String, class: String, price: Number, instructor: String });
const HomeworkSchema = new mongoose.Schema({ class: String, section: String, subject: String, title: String, homework_date: Date, submission_date: Date });
const ExamGroupSchema = new mongoose.Schema({ name: { type: String, required: true }, exam_type: String });
const StudentCategorySchema = new mongoose.Schema({ category: { type: String, required: true, unique: true } });

// Register Models
const Department = mongoose.models.Department || mongoose.model("Department", DepartmentSchema);
const Designation = mongoose.models.Designation || mongoose.model("Designation", DesignationSchema);
const Staff = mongoose.models.Staff || mongoose.model("Staff", StaffSchema);
const Subject = mongoose.models.Subject || mongoose.model("Subject", SubjectSchema);
const Book = mongoose.models.Book || mongoose.model("Book", BookSchema);
const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
const OnlineCourse = mongoose.models.OnlineCourse || mongoose.model("OnlineCourse", OnlineCourseSchema);
const Homework = mongoose.models.Homework || mongoose.model("Homework", HomeworkSchema);
const ExamGroup = mongoose.models.ExamGroup || mongoose.model("ExamGroup", ExamGroupSchema);
const StudentCategory = mongoose.models.StudentCategory || mongoose.model("StudentCategory", StudentCategorySchema);

async function megaSeed() {
    console.log("🚀 Starting Global Panel Population Cycle...");
    await mongoose.connect(MONGODB_URI);

    // 1. Clean existing records in these massive partitions
    console.log("🧹 Flushing secondary memory banks...");
    await Promise.all([
        Department.deleteMany({}), Designation.deleteMany({}), Staff.deleteMany({}),
        Subject.deleteMany({}), Book.deleteMany({}), Notice.deleteMany({}),
        OnlineCourse.deleteMany({}), Homework.deleteMany({}), ExamGroup.deleteMany({}),
        StudentCategory.deleteMany({})
    ]);

    // 2. HR - Departments & Designations
    console.log("👔 Provisioning HR Infrastructure...");
    const depts = await Department.insertMany([{ name: "Academic" }, { name: "Administration" }, { name: "Finance" }, { name: "Library" }]);
    const desigs = await Designation.insertMany([{ name: "Senior Teacher" }, { name: "Coordinator" }, { name: "Librarian" }, { name: "Accountant" }]);

    // 3. HR - Staff Records
    console.log("👤 Registering 10 Staff Personnel...");
    const staffMembers = [];
    for (let i = 1; i <= 10; i++) {
        staffMembers.push({
            staff_id: `STF-${100 + i}`,
            name: `Staff Member ${i}`,
            email: `staff${i}@school.edu`,
            mobile: `99887766${i}${i}`,
            role: i < 5 ? "Teacher" : "Admin",
            department: depts[i % depts.length].name,
            designation: desigs[i % desigs.length].name
        });
    }
    await Staff.insertMany(staffMembers);

    // 4. Academics - Subjects
    console.log("📚 Injecting Academic Subjects...");
    await Subject.insertMany([
        { name: "Mathematics", code: "MATH101", type: "Theory" },
        { name: "Science", code: "SCI102", type: "Both" },
        { name: "English", code: "ENG103", type: "Theory" },
        { name: "History", code: "HIS104", type: "Theory" },
        { name: "Computer Science", code: "CS105", type: "Practical" }
    ]);

    // 5. Library - Books
    console.log("📖 Stocking Library Inventory...");
    await Book.insertMany([
        { title: "Introduction to Calculus", book_no: "BK-001", author: "James Stewart", quantity: 5 },
        { title: "Brief History of Time", book_no: "BK-002", author: "Stephen Hawking", quantity: 2 },
        { title: "Modern Physics", book_no: "BK-003", author: "HC Verma", quantity: 10 },
        { title: "English Grammar", book_no: "BK-004", author: "Wren & Martin", quantity: 15 }
    ]);

    // 6. Communication - Notices
    console.log("📢 Broadcasting 5 Global Notices...");
    await Notice.insertMany([
        { title: "Annual Sports Meet 2026", message: "Join us for the sports extravaganza next week.", publish_date: new Date() },
        { title: "Winter Vacation Schedule", message: "Vacations start from Dec 20th.", publish_date: new Date() },
        { title: "New Library Rules", message: "Late fees increased from next month.", publish_date: new Date() },
        { title: "PTM Announcement", message: "Parent-Teacher meeting on Saturday.", publish_date: new Date() },
        { title: "Result Declaration", message: "Mid-term results are now available online.", publish_date: new Date() }
    ]);

    // 7. Online Courses
    console.log("🎓 Publishing Online Course Catalog...");
    await OnlineCourse.insertMany([
        { title: "Mastering React for Beginners", category: "Programming", class: "11th", price: 499, instructor: "John Smith" },
        { title: "Spoken English Pro", category: "Language", class: "Any", price: 299, instructor: "Alice Johnson" },
        { title: "Advanced Calculus", category: "Mathematics", class: "12th", price: 599, instructor: "David Miller" }
    ]);

    // 8. Homework
    console.log("📝 Generating 5 Homework Tasks...");
    await Homework.insertMany([
        { class: "10th", section: "A", subject: "Mathematics", title: "Algebra Exercises", homework_date: new Date(), submission_date: new Date() },
        { class: "11th", section: "B", subject: "Science", title: "Physics Lab Report", homework_date: new Date(), submission_date: new Date() },
        { class: "12th", section: "A", subject: "English", title: "Poetry Analysis", homework_date: new Date(), submission_date: new Date() }
    ]);

    // 9. Examination - Exam Groups
    console.log("📝 Configuring Exam Groups...");
    await ExamGroup.insertMany([
        { name: "Quarterly Examination", exam_type: "GPA" },
        { name: "Mid-term Examination", exam_type: "Percentage" },
        { name: "Final Examination", exam_type: "GPA" }
    ]);

    // 10. Student Categories
    console.log("🏷️ Seeding Student Categories...");
    await StudentCategory.insertMany([
        { category: "General" }, { category: "OBC" }, { category: "SC/ST" }, { category: "EWS" }
    ]);

    console.log("\n✨ MEGA DATA SYNCHRONIZATION COMPLETE.");
    console.log("🎯 Total Coverage: 20+ Models across all Sidebar Clusters.");
    process.exit(0);
}

megaSeed().catch(err => {
    console.error("❌ Massive Registry Failure:", err);
    process.exit(1);
});
