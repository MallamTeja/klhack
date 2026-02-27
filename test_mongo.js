import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

if (!MONGODB_URL) {
    console.error("❌ Error: MONGODB_URL is not defined in your .env file.");
    process.exit(1);
}

console.log("Attempting to connect to MongoDB...");

mongoose.connect(MONGODB_URL)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB!");
        console.log("Database URI Host:", mongoose.connection.host);

        // Disconnect immediately after success
        mongoose.disconnect().then(() => {
            console.log("Connection closed.");
            process.exit(0);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to connect to MongoDB:");
        console.error(err.message);
        process.exit(1);
    });
