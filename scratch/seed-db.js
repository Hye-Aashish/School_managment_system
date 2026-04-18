const mongoose = require('mongoose');

const uri = "mongodb://aashishofficial123_db_user:AV445S3k0brlHEPu@ac-791ijbv-shard-00-00.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-01.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-02.q0seg1w.mongodb.net:27017/school_managment_system?ssl=true&replicaSet=atlas-uhm015-shard-0&authSource=admin&retryWrites=true&w=majority";

const StudentSchema = new mongoose.Schema({
    admission_no: { type: String, required: true, unique: true },
    roll_no: { type: String },
    class: { type: String, required: true },
    section: { type: String, required: true },
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    status: { type: String, default: "Active" },
    admission_date: { type: String },
    created_at: { type: Date, default: Date.now },
});

const Student = mongoose.model('Student', StudentSchema);

async function seed() {
    try {
        await mongoose.connect(uri);
        console.log("Connected");
        
        const students = [
            { admission_no: "ADM001", roll_no: "1", class: "10", section: "A", fname: "John", lname: "Doe", status: "Active", admission_date: "2024-04-01" },
            { admission_no: "ADM002", roll_no: "2", class: "10", section: "A", fname: "Jane", lname: "Smith", status: "Active", admission_date: "2024-04-02" },
            { admission_no: "ADM003", roll_no: "3", class: "9", section: "B", fname: "Alice", lname: "Johnson", status: "Disabled", admission_date: "2024-04-03" },
            { admission_no: "ADM004", roll_no: "4", class: "10", section: "C", fname: "Bob", lname: "Brown", status: "Active", admission_date: "2024-04-04" },
            { admission_no: "ADM005", roll_no: "5", class: "8", section: "A", fname: "Charlie", lname: "Davis", status: "Active", admission_date: "2024-04-05" },
        ];

        await Student.deleteMany({});
        await Student.insertMany(students);
        console.log("Seeded 5 students");
    } catch (e) {
        console.error(e);
    } finally {
        await mongoose.disconnect();
    }
}

seed();
