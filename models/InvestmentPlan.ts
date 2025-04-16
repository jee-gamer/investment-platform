import mongoose, { Schema, Document } from 'mongoose';

type PlanStatus = 'pending' | 'approved' | 'declined';

export interface IInvestmentPlan extends Document {
    id: string;
    investor: mongoose.Types.ObjectId;
    business: mongoose.Types.ObjectId;
    amount: number;
    receipt?: string;
    status: PlanStatus;
}

const InvestmentPlanSchema: Schema = new Schema(
    {
        id: {
            type: String,
            required: true,
            unique: true,
        },
        investor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Investor',
            required: true,
        },
        business: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'BusinessOwner',
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
        timestamps: true,
    }
);

const InvestmentPlanModel = mongoose.model<IInvestmentPlan>('InvestmentPlan', InvestmentPlanSchema);

export default InvestmentPlanModel;
