// models/Investor.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestor extends Document {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    profile?: string;
}

const InvestorSchema: Schema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    profile: { type: String },
}, {
    timestamps: true
});

const InvestorModel = mongoose.model<IInvestor>('Investor', InvestorSchema);

export default InvestorModel;
