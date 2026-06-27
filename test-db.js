const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://aashishofficial123_db_user:MBR1hDZFGLIFno1q@cluster0.q0seg1w.mongodb.net/School?retryWrites=true&w=majority";

async function main() {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected");

    const OfflineBankPayment = mongoose.models.OfflineBankPayment || mongoose.model('OfflineBankPayment', new mongoose.Schema({
        student: { type: mongoose.Schema.Types.ObjectId, ref: "Student" },
        fee_master: { type: mongoose.Schema.Types.ObjectId, ref: "FeeMaster" },
        payment_date: { type: String },
        submit_date: { type: Date, default: Date.now },
        amount: { type: Number, required: true },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
        note: { type: String },
        attachment: { type: String },
        payment_id: { type: String },
        status_date: { type: Date }
    }));

    const count = await OfflineBankPayment.countDocuments();
    console.log("Total entries:", count);

    const data = await OfflineBankPayment.find().populate("student").limit(2);
    console.log("Sample:", JSON.stringify(data, null, 2));

    await mongoose.disconnect();
}

main().catch(console.error);
