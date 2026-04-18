
async function testAPI() {
    try {
        const dbConnect = require("../../lib/mongodb").default;
        const Class = require("../../models/Class").default;
        await dbConnect();
        const classes = await Class.find({}).populate("sections").sort({ name: 1 });
        console.log("Classes found:", classes.length);
        classes.forEach(c => console.log(`- ${c.name} (${c.sections.length} sections)`));
    } catch (err) {
        console.error("Test failed:", err);
    }
}
testAPI();
