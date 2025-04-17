// lib/models/Business.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBusiness extends Document {
    id: string; // <- custom id field
    businessName: string;
    publicData?: string;
    privateData?: string;
}

const BusinessSchema: Schema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    businessName: { type: String, required: true },
    publicData: { type: String, required: false },
    privateData: { type: String, required: false },
}, { timestamps: true });

const Business = mongoose.model<IBusiness>('Business', BusinessSchema);

export default Business;
