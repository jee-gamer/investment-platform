// lib/databaseManager.ts
import mongoose, { Mongoose } from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

class DatabaseManager {
    private static instance: DatabaseManager;
    private static connection: Mongoose | null = null;
    private static promise: Promise<Mongoose> | null = null;

    private constructor() {
        // Prevent direct instantiation
    }

    static getInstance(): DatabaseManager {
        if (!DatabaseManager.instance) {
            DatabaseManager.instance = new DatabaseManager();
        }
        return DatabaseManager.instance;
    }

    async getConnection(): Promise<Mongoose> {
        if (DatabaseManager.connection) {
            return DatabaseManager.connection;
        }

        if (!DatabaseManager.promise) {
            DatabaseManager.promise = mongoose.connect(MONGODB_URI!);
        }

        DatabaseManager.connection = await DatabaseManager.promise;
        return DatabaseManager.connection;
    }
}

export default DatabaseManager;
