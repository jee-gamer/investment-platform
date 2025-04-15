// models/Investment.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IInvestment extends Document {
    investor: mongoose.Types.ObjectId;
    business: mongoose.Types.ObjectId;
    amount: number;
}

const InvestmentSchema: Schema = new Schema({
    investor: {
        type: Schema.Types.ObjectId,
        ref: 'Investor',
        required: true
    },
    business: {
        type: Schema.Types.ObjectId,
        ref: 'BusinessOwner',
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const InvestmentModel = mongoose.model<IInvestment>('Investment', InvestmentSchema);

export default InvestmentModel;
