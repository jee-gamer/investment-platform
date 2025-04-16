// lib/repos/InvestmentPlanRepo.ts
import InvestmentPlanModel, { IInvestmentPlan } from '@/models/InvestmentPlan';
import DatabaseManager from '@/lib/DatabaseManager';
import InvestmentPlan from "@/lib/InvestmentPlan";

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
