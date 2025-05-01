// src/database/pg.database.js
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.on('connect', () => {
    console.log("Connected to database");
});

pool.on('error', (err) => {
    console.error("Database error:", err);
    process.exit(-1);  // Keluar dari proses jika terdapat fatal error
});

const query = async (text, params) => {
    try {
        console.log(`📡 Executing query: ${text} with params ${params}`);
        const result = await pool.query(text, params);
        return result;
    } catch (error) {
        console.error("Query execution failed:", error);
        throw error;
    }
};

// filepath: src/database/pg.database.js
const connectWithRetry = async () => {
    let retries = 5;
    while (retries) {
        try {
            await pool.connect();
            console.log("Connected to database");
            break;
        } catch (err) {
            console.error("Database connection failed. Retrying...", err);
            retries -= 1;
            await new Promise(res => setTimeout(res, 5000)); // Tunggu 5 detik sebelum retry
        }
    }
};

connectWithRetry();

module.exports = {
    query,
};
