const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb+srv://aashishofficial123_db_user:MBR1hDZFGLIFno1q@cluster0.q0seg1w.mongodb.net/?appName=Cluster0";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("test"); // Mongoose default

        // 1. Fetch all students to see names and IDs
        const students = await db.collection("students").find().toArray();
        console.log("=== STUDENTS ===");
        students.forEach(s => {
            console.log(`ID: ${s._id} | Name: ${s.fname} ${s.lname} | Email: ${s.email}`);
        });

        // 2. Fetch all fee masters
        const masters = await db.collection("feemasters").find().toArray();
        console.log("\n=== FEE MASTERS ===");
        for (let m of masters) {
            const feeType = m.fee_type ? await db.collection("feetypes").findOne({ _id: m.fee_type }) : null;
            const feeGroup = m.fee_group ? await db.collection("feegroups").findOne({ _id: m.fee_group }) : null;
            const category = feeType?.name || feeGroup?.name || "School Fee";
            console.log(`ID: ${m._id} | Category: ${category} | Amount: ₹${m.amount} | Due: ${m.due_date}`);
        }

        // 3. Fetch all payments
        const payments = await db.collection("feepayments").find().toArray();
        console.log("\n=== FEE PAYMENTS ===");
        payments.forEach(p => {
            console.log(`ID: ${p._id} | Student: ${p.student} | FeeMaster: ${p.fee_master} | Paid: ₹${p.amount_paid} | Discount: ₹${p.discount_amount ?? 0} | Mode: ${p.payment_mode} | Ref: ${p.reference_no} | Status: ${p.status}`);
        });

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();
