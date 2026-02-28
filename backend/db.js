import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();

// Create a connection pool instead of a single connection
// This is better for web servers to handle multiple concurrent requests
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'taxflow_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Simple query to test the connection immediately on startup
const testConnection = async () => {
    try {
        const connection = await pool.getConnection();
        console.log(`MySQL Connected: ${process.env.DB_HOST || 'localhost'} / ${process.env.DB_NAME || 'taxflow_db'}`);
        connection.release();
    } catch (error) {
        console.error(`MySQL connection error: ${error.message}`);
        console.error('Check your .env file for DB_HOST, DB_USER, DB_PASSWORD, DB_NAME');
        process.exit(1);
    }
};

testConnection();

export default pool;
