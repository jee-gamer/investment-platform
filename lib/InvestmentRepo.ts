import InvestmentModel, {IInvestment} from '@/models/Investment';
import Investment from '@/lib/Investment';
import DatabaseManager from "@/lib/DatabaseManager";
import InvestorRepo from '@/lib/InvestorRepo';
import BusinessRepo from '@/lib/BusinessRepo';

const DB = DatabaseManager.getInstance();

export default class InvestmentRepo {

    static async create(investment: Investment): Promise<IInvestment> {
        await DB.getConnection();

        const updatedInvestor = await InvestorRepo.update(investment.investor);
        const updatedBusiness = await BusinessRepo.update(investment.business);

        const newInvestment = new InvestmentModel({
            id: investment.id,
            investor: updatedInvestor._id,  // Directly use the _id from the updated Investor
            business: updatedBusiness._id,  // Directly use the _id from the updated Business
            amount: investment.amount,
        });

        return newInvestment.save();
    }

    static async update(investment: Investment): Promise<Investment | null> {
        await DB.getConnection();

        const updatedInvestor = await InvestorRepo.update(investment.investor);
        const updatedBusiness = await BusinessRepo.update(investment.business);

        return InvestmentModel.findOneAndUpdate(
            { id: investment.id },
            {
                investor: updatedInvestor._id,  // Directly use the _id from the updated Investor
                business: updatedBusiness._id,  // Directly use the _id from the updated Business
                amount: investment.amount,
            },
            { new: true }  // Return the updated investment
        );
    }

    static async getById(id: string): Promise<Investment | null> {
        await DB.getConnection();

        return InvestmentModel.findOne({ id: id });  // Removed .exec() here
    }

    static async getAll(): Promise<Investment[]> {
        await DB.getConnection();

        return InvestmentModel.find();  // Removed .exec() here
    }

    static async delete(id: string): Promise<Investment | null> {
        await DB.getConnection();

        return InvestmentModel.findOneAndDelete({ id });  // Removed .exec() here
    }
}
