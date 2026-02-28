import pool from './db.js';

async function runTests() {
    try {
        console.log("Testing MySQL connection...");
        const [rows] = await pool.execute('SELECT 1 + 1 AS solution');
        console.log("Connection successful! Result of 1 + 1:", rows[0].solution);

        console.log("Checking tables...");
        const [tables] = await pool.execute('SHOW TABLES');
        const tableNames = tables.map(t => Object.values(t)[0]);
        console.log("Tables in database:", tableNames.length > 0 ? tableNames : "None found. Did you run schema.sql?");

        if (tableNames.length > 0) {
            console.log("\nGreat! The database connection works and tables are present.");
            console.log("You can now test the API endpoints.");
        }

    } catch (error) {
        console.error("Error connecting to MySQL or querying:", error.message);
    } finally {
        // Close pool to allow script to exit
        await pool.end();
        process.exit(0);
    }
}

runTests();
