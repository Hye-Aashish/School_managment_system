import fs from "fs";
import path from "path";

const DB_PATH = path.join(process.cwd(), "db.json");

const DEFAULT_DB = {
    students: [],
    online_admissions: [],
    categories: [],
    houses: [],
    reasons: []
};

export function readDb() {
    if (!fs.existsSync(DB_PATH)) {
        fs.writeFileSync(DB_PATH, JSON.stringify(DEFAULT_DB, null, 2));
        return DEFAULT_DB;
    }
    const data = fs.readFileSync(DB_PATH, "utf-8");
    return JSON.parse(data);
}

export function writeDb(data: any) {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}
