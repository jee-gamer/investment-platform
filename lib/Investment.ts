// lib/models/Investment.ts
import Investor from '@/lib/Investor'
import Business from '@/lib/Business'
import DatabaseManager from "@/lib/DatabaseManager";
import InvestmentModel, {IInvestment} from "@/models/Investment";

const DB = DatabaseManager.getInstance();

export default class Investment {
    id: string
    investor: Investor
    business: Business
    amount: number

    constructor(investor: Investor, business: Business, amount: number) {
        this.id = crypto.randomUUID()
        this.investor = investor
        this.business = business
        this.amount = amount
    }

    async save(): Promise<IInvestment> {
        await DB.getConnection();

        await this.business.save();
        await this.investor.save();

        const doc = await InvestmentModel.findOneAndUpdate(
            { id: this.id }, // Use the investment's ID to find the record
            {
                id: this.id,
                investor: this.investor.id,
                business: this.business.id,
                amount: this.amount, // Store the investment amount
            },
            { upsert: true, returnDocument: "after" }
        ).lean();

        return doc;
    }

}
