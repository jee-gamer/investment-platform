// lib/models/Business.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IBusiness extends Document {
    businessName: string;
    publicData?: string;
    privateData?: string;
}

const BusinessSchema: Schema = new Schema({
    businessName: { type: String, required: true },
    publicData: { type: String, required: false },
    privateData: { type: String, required: false }
}, { timestamps: true });

const Business = mongoose.model<IBusiness>('Business', BusinessSchema);

export default Business;
