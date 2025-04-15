// models/BusinessOwner.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBusinessOwner extends Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    business?: string;
}

const BusinessOwnerSchema: Schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    business: { type: String },
}, {
    timestamps: true
});

const BusinessOwnerModel = mongoose.model<IBusinessOwner>('BusinessOwner', BusinessOwnerSchema);

export default BusinessOwnerModel;
