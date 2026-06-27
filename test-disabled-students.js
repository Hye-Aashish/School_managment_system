const mongoose = require('mongoose');
const Student = require('./src/models/Student').default;

mongoose.connect('mongodb://localhost:27017/school_crm').then(async () => {
    const total = await Student.countDocuments();
    const disabled = await Student.countDocuments({ status: "Disabled" });
    const all = await Student.find({}, 'fname lname status class section');
    console.log("Total students:", total);
    console.log("Disabled students:", disabled);
    console.log("All students:", all);
    process.exit(0);
});
