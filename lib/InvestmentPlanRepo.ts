// lib/repos/InvestmentPlanRepo.ts
import InvestmentPlanModel, { IInvestmentPlan } from '@/models/InvestmentPlan';
import DatabaseManager from '@/lib/DatabaseManager';
import InvestmentPlan from "@/lib/InvestmentPlan";
import { Types } from 'mongoose';
import InvestorModel  from '@/models/Investor';  // Assuming these are your models
import BusinessModel  from '@/models/Business';
import BusinessRepo from "@/lib/BusinessRepo";

const DB = DatabaseManager.getInstance();

export default class InvestmentPlanRepo {
    static async create(investmentPlan: InvestmentPlan): Promise<IInvestmentPlan> {
        await DB.getConnection();
        const { investor, business, amount, receipt, status, id } = investmentPlan;

        const investorDoc = await InvestorModel.findOne({ id: investor.id });
        const businessDoc = await BusinessModel.findOne({ id: business.id });

        if (!investorDoc || !businessDoc) {
            throw new Error('Investor or Business not found');
        }



        await investorDoc.save();  // Save the updated investor


        if (business.needsSave) {
            await businessDoc.save();  // Save the updated business
        }

        // Create the new InvestmentPlan with the MongoDB _id references
        const newPlan = new InvestmentPlanModel({
            id,  // Keep your custom `id` as a string
            investor: investorDoc._id, // Use MongoDB _id for investor
            business: businessDoc._id, // Use MongoDB _id for business
            amount,
            receipt,
            status,
        });

        return newPlan.save(); // MongoDB automatically generates _id for InvestmentPlan
    }

    static async update(investmentPlan: InvestmentPlan): Promise<IInvestmentPlan | null> {
        await DB.getConnection();

        // Find the Investor and Business by their custom id
        let investorDoc = await InvestorModel.findOne({ id: investmentPlan.investor.id });
        let businessDoc = await BusinessModel.findOne({ id: investmentPlan.business.id });

        // If the Investor or Business does not exist, throw an error
        if (!investorDoc || !businessDoc) {
            throw new Error('Investor or Business not found');
        }

        // If changes were made to the investor or business, save them first
        if (investmentPlan.investor.needsSave) {
            await investorDoc.save();  // Save the updated investor
        }

        if (investmentPlan.business.needsSave) {
            await businessDoc.save();  // Save the updated business
        }

        // Update the InvestmentPlan with MongoDB _id references
        return InvestmentPlanModel.findOneAndUpdate(
            { id: investmentPlan.id }, // Use your custom `id` for finding
            {
                investor: investorDoc._id, // Use MongoDB _id for investor
                business: businessDoc._id, // Use MongoDB _id for business
                amount: investmentPlan.amount,
                receipt: investmentPlan.receipt,
                status: investmentPlan.status,
            },
            { new: true } // Return updated document
        );
    }
}

