import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;

console.log("Checking MongoDB connection...");
console.log("URI:", MONGODB_URI ? "Found" : "Missing");

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB");
        process.exit(0);
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB:", err.message);
        process.exit(1);
    });
