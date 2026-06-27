const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

async function main() {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.error("MONGODB_URI is not defined in .env file.");
        return;
    }

    console.log("Connecting to:", uri.replace(/:([^@]+)@/, ":xxxxxx@"));
    const client = new MongoClient(uri);

    try {
        await client.connect();
        const db = client.db("school_managment_system");
        
        // Find active configs
        const configs = await db.collection("paymentconfigs").find({}).toArray();
        console.log("\n--- Active Configurations in DB ---");
        if (configs.length === 0) {
            console.log("No payment config documents found!");
        }
        configs.forEach(c => {
            console.log(`Provider: ${c.provider}`);
            console.log(`- Enabled: ${c.enabled}`);
            console.log(`- Key ID: ${c.keyId}`);
            console.log(`- Key Secret Length: ${c.keySecret ? c.keySecret.length : 0}`);
            if (c.keySecret) {
                console.log(`- Key Secret Masked: ${c.keySecret.substring(0, 4)}...${c.keySecret.substring(c.keySecret.length - 4)}`);
            }
            console.log(`- Sandbox: ${c.sandbox}`);
            console.log("------------------------");
        });

        const active = configs.find(c => c.enabled);
        if (!active) {
            console.log("WARNING: No payment gateway configuration is marked as 'enabled: true' in the database!");
            return;
        }

        if (active.provider === 'razorpay') {
            console.log("\nTesting Razorpay Order Creation API Call...");
            const authHeader = `Basic ${Buffer.from(active.keyId + ":" + active.keySecret).toString("base64")}`;
            const rzpUrl = "https://api.razorpay.com/v1/orders";

            const response = await fetch(rzpUrl, {
                method: "POST",
                headers: {
                    "Authorization": authHeader,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: 100, // 1 INR (100 paise)
                    currency: "INR",
                    receipt: `test_receipt_${Date.now()}`
                })
            });

            console.log(`Response Status: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.log(`Response Body: ${text}`);
        } else if (active.provider === 'cashfree') {
            console.log("\nTesting Cashfree Order Creation API Call...");
            const cfUrl = active.sandbox 
                ? "https://sandbox.cashfree.com/pg/orders" 
                : "https://api.cashfree.com/pg/orders";

            const headers = {
                "x-client-id": active.keyId,
                "x-client-secret": active.keySecret,
                "x-api-version": "2023-08-01",
                "Content-Type": "application/json"
            };

            const response = await fetch(cfUrl, {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    order_id: `test_order_${Date.now()}`,
                    order_amount: 1,
                    order_currency: "INR",
                    customer_details: {
                        customer_id: "test_cust_id",
                        customer_phone: "9999999999",
                        customer_email: "test@school.com",
                        customer_name: "Test User"
                    }
                })
            });

            console.log(`Response Status: ${response.status} ${response.statusText}`);
            const text = await response.text();
            console.log(`Response Body: ${text}`);
        }

    } catch (e) {
        console.error("Error running test:", e);
    } finally {
        await client.close();
    }
}

main();
