import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env') });

async function testConnection() {
    try {
        console.log('Attempting to connect to the database...');
        console.log(`Host: ${process.env.DB_HOST}`);
        console.log(`User: ${process.env.DB_USER}`);
        console.log(`Database: ${process.env.DB_NAME}`);
        console.log(`Port: ${process.env.DB_PORT}`);

        const connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME || 'taxflow',
            port: process.env.DB_PORT || 3306
        });

        console.log('\n✅ Successfully connected to the MySQL database!');
        await connection.end();
    } catch (error) {
        console.error('\n❌ Error connecting to the database:', error.message);
    }
}

testConnection();
