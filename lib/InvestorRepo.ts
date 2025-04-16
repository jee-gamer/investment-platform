import InvestorModel from '@/models/Investor';
import { IInvestor } from '@/models/Investor';
import DatabaseManager from "@/lib/DatabaseManager";
import Investor from "@/lib/Investor";

const DB = DatabaseManager.getInstance();

export default class InvestorRepo {

    static async create(investor: Investor): Promise<IInvestor> {
        await DB.getConnection();

        const newInvestor = new InvestorModel({
            id: investor.id,
            firstName: investor.firstName,
            lastName: investor.lastName,
            email: investor.email,
            phone: investor.phone,
            profile: investor.profile,
        });

        return newInvestor.save();
    }

    static async update(investor: Investor): Promise<IInvestor> {
        await DB.getConnection();

        return InvestorModel.findOneAndUpdate(
            { id: investor.id },
            {
                firstName: investor.firstName,
                lastName: investor.lastName,
                email: investor.email,
                phone: investor.phone,
                profile: investor.profile,
            },
            { new: true }
        );
    }

    static async getById(id: string): Promise<IInvestor | null> {
        await DB.getConnection();

        return InvestorModel.findOne({ id }).exec();
    }

    static async getAll(): Promise<IInvestor[]> {
        await DB.getConnection();

        return InvestorModel.find().exec();
    }

    static async delete(id: string): Promise<IInvestor | null> {
        await DB.getConnection();

        return InvestorModel.findOneAndDelete({ id }).exec();
    }
}
