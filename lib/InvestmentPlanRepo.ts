// lib/repos/InvestmentPlanRepo.ts
import InvestmentPlanModel, { IInvestmentPlan } from '@/models/InvestmentPlan';
import DatabaseManager from '@/lib/DatabaseManager';
import InvestmentPlan, {PlanStatus, TInvestmentPlan} from "@/lib/InvestmentPlan";
import { Types } from 'mongoose';

const DB = DatabaseManager.getInstance();

export default class InvestmentPlanRepo {
    static async create(investmentPlan: InvestmentPlan): Promise<IInvestmentPlan> {
        await DB.getConnection();
        const { investor, business, amount, receipt, status } = investmentPlan;

        const newPlan = new InvestmentPlanModel({
            investor,
            business,
            amount,
            receipt,
            status,
        });
        return newPlan.save();
    }
}
