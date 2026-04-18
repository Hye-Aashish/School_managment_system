import mongoose from 'mongoose';

const MONGODB_URI = "mongodb://aashishofficial123_db_user:AV445S3k0brlHEPu@ac-791ijbv-shard-00-00.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-01.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-02.q0seg1w.mongodb.net:27017/school_managment_system?ssl=true&replicaSet=atlas-uhm015-shard-0&authSource=admin&retryWrites=true&w=majority";

// Schemas tuned to actual model requirements
const sectionSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true } }, { timestamps: true });
const classSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, sections: [{ type: mongoose.Schema.Types.ObjectId, ref: "Section" }] }, { timestamps: true });

const studentSchema = new mongoose.Schema({
    admission_no: { type: String, required: true, unique: true },
    roll_no: String,
    class: { type: String, required: true },
    section: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    gender: String, mobile: String, father_name: String, status: { type: String, default: "Active" },
    created_at: { type: Date, default: Date.now }
});

const onlineAdmissionSchema = new mongoose.Schema({
    reference_no: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    class: { type: String, required: true },
    section: { type: String, required: true },
    father_name: String, status: { type: String, default: "Submitted" },
    created_at: { type: Date, default: Date.now }
});

const incomeHeadSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, description: String });
const incomeSchema = new mongoose.Schema({
    incomeHead: { type: mongoose.Schema.Types.ObjectId, ref: "IncomeHead", required: true },
    name: { type: String, required: true }, amount: { type: Number, required: true }, date: { type: Date, required: true }
});

const expenseHeadSchema = new mongoose.Schema({ name: { type: String, required: true, unique: true }, description: String });
const expenseSchema = new mongoose.Schema({
    expenseHead: { type: mongoose.Schema.Types.ObjectId, ref: "ExpenseHead", required: true },
    name: { type: String, required: true }, amount: { type: Number, required: true }, date: { type: Date, required: true }
});

const Section = mongoose.models.Section || mongoose.model("Section", sectionSchema);
const Class = mongoose.models.Class || mongoose.model("Class", classSchema);
const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
const OnlineAdmission = mongoose.models.OnlineAdmission || mongoose.model("OnlineAdmission", onlineAdmissionSchema);
const IncomeHead = mongoose.models.IncomeHead || mongoose.model("IncomeHead", incomeHeadSchema);
const Income = mongoose.models.Income || mongoose.model("Income", incomeSchema);
const ExpenseHead = mongoose.models.ExpenseHead || mongoose.model("ExpenseHead", expenseHeadSchema);
const Expense = mongoose.models.Expense || mongoose.model("Expense", expenseSchema);

async function seed() {
    console.log("🚀 Initializing Full Panel Data Synchronization...");
    await mongoose.connect(MONGODB_URI);

    console.log("🧹 Flushing existing system registry...");
    await Promise.all([
        Section.deleteMany({}), Class.deleteMany({}), Student.deleteMany({}),
        OnlineAdmission.deleteMany({}), IncomeHead.deleteMany({}), Income.deleteMany({}),
        ExpenseHead.deleteMany({}), Expense.deleteMany({})
    ]);

    // 1. Sections
    console.log("📦 Creating Sections...");
    const sections = await Section.insertMany([{ name: "A" }, { name: "B" }, { name: "C" }]);
    const secA = sections[0]._id;

    // 2. Classes
    console.log("🏢 Creating Classes...");
    const classes = await Class.insertMany([
        { name: "10th", sections: [secA] },
        { name: "11th", sections: [secA] },
        { name: "12th", sections: [secA] }
    ]);

    // 3. Students (30 records)
    console.log("🎓 Registering 30 Student Nodes...");
    const studentsData = [];
    const firstNames = ["Aashish", "Rahul", "Priya", "Sneha", "Amit", "Karan", "Anjali", "Surbhi", "Vikas", "Nehal"];
    const lastNames = ["Pandey", "Khanna", "Reddy", "Sharma", "Yadav", "Malhotra", "Gupta", "Verma", "Singh", "Das"];
    
    for (let i = 1; i <= 30; i++) {
        studentsData.push({
            admission_no: `ADM-2026-${i.toString().padStart(3, '0')}`,
            roll_no: `${i}`,
            class: classes[Math.floor(Math.random() * classes.length)].name,
            section: "A",
            fname: firstNames[Math.floor(Math.random() * firstNames.length)],
            lname: lastNames[Math.floor(Math.random() * lastNames.length)],
            gender: i % 2 === 0 ? "Male" : "Female",
            mobile: `9876543${i.toString().padStart(3, '0')}`,
            father_name: "Mr. Parent",
            status: "Active"
        });
    }
    await Student.insertMany(studentsData);

    // 4. Financials
    console.log("💰 Injecting Revenue & Expense Activity...");
    const iHead = await IncomeHead.create({ name: "General Fee", description: "Standard tuition" });
    const eHead = await ExpenseHead.create({ name: "Utility", description: "Operational costs" });
    
    const financialHistory = [];
    for (let i = 1; i <= 20; i++) {
        financialHistory.push(
            Income.create({ incomeHead: iHead._id, name: "Fee Received", amount: 2500 + (Math.random() * 1000), date: new Date() }),
            Expense.create({ expenseHead: eHead._id, name: "Maintainance", amount: 500 + (Math.random() * 500), date: new Date() })
        );
    }
    await Promise.all(financialHistory);

    // 5. Online Admissions
    console.log("🌐 Propagating 5 Online Hooks...");
    await OnlineAdmission.insertMany([
        { reference_no: "REF-001", first_name: "Kunal", last_name: "Shah", class: "10th", section: "A", status: "Submitted" },
        { reference_no: "REF-002", first_name: "Isha", last_name: "Negi", class: "11th", section: "A", status: "Submitted" },
        { reference_no: "REF-003", first_name: "Rohan", last_name: "Mehra", class: "12th", section: "A", status: "Submitted" },
        { reference_no: "REF-004", first_name: "Tanvi", last_name: "Jain", class: "10th", section: "A", status: "Submitted" },
        { reference_no: "REF-005", first_name: "Sahil", last_name: "Goel", class: "11th", section: "A", status: "Submitted" }
    ]);

    console.log("\n✨ PANEL SYNCHRONIZATION SUCCESSFUL.");
    process.exit(0);
}

seed().catch(err => {
    console.error("❌ Registry Fault:", err);
    process.exit(1);
});
