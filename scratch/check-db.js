const { MongoClient } = require('mongodb');

async function main() {
    const uri = "mongodb://aashishofficial123_db_user:AV445S3k0brlHEPu@ac-791ijbv-shard-00-00.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-01.q0seg1w.mongodb.net:27017,ac-791ijbv-shard-00-02.q0seg1w.mongodb.net:27017/school_managment_system?ssl=true&replicaSet=atlas-uhm015-shard-0&authSource=admin&retryWrites=true&w=majority";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB");
        const db = client.db("school_managment_system");
        const collections = await db.listCollections().toArray();
        console.log("Collections:", collections.map(c => c.name));
        
        for (let coll of collections) {
            const count = await db.collection(coll.name).countDocuments();
            console.log(`- ${coll.name}: ${count} docs`);
        }
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main();
