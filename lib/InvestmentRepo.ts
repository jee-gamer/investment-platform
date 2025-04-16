// lib/repos/InvestmentPlanRepo.ts
import Investment from "@/lib/Investment";
import DatabaseManager from '@/lib/DatabaseManager';
import InvestmentModel, {IInvestment} from "@/models/Investment";

const DB = DatabaseManager.getInstance();

export default class InvestmentRepo {
    static async create(investment: Investment): Promise<IInvestment> {
        await DB.getConnection();
        const { investor, business, amount } = investment;

        const newInvestment = new InvestmentModel({
            investor,
            business,
            amount,
        });
        return newInvestment.save();
    }
}