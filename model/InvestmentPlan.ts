// models/InvestmentPlan.ts
import mongoose, { Schema, Document } from 'mongoose';

type PlanStatus = 'pending' | 'approved' | 'declined';

export interface IInvestmentPlan extends Document {
    investor: mongoose.Types.ObjectId; // Correct type for ObjectId reference
    business: mongoose.Types.ObjectId; // Correct type for ObjectId reference
    amount: number;
    receipt?: string;
    status: PlanStatus;
}

const InvestmentPlanSchema: Schema = new Schema(
    {
        investor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor', // Referencing the Investor model
            required: true,
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BusinessOwner', // Referencing the BusinessOwner model
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        receipt: {
            type: String,
            required: false,
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'declined'],
            default: 'pending',
            required: true,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt timestamps
    }
);

const InvestmentPlanModel = mongoose.model<IInvestmentPlan>('InvestmentPlan', InvestmentPlanSchema);

export default InvestmentPlanModel;
