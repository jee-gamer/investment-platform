// lib/investorAccount.ts
import Account from '@/lib/Account';
import InvestorModel, { IInvestor } from '@/models/Investor'; // Assuming you have a model for Investor
import DatabaseManager from "@/lib/DatabaseManager"; // Assuming you have a DB manager

const DB = DatabaseManager.getInstance();

class Investor extends Account {
    profile?: string;

    constructor(init?: Partial<Investor>) {
        super(init);
        this.profile = init?.profile;
    }

    getAccountType(): string {
        return 'Investor';
    }

    makePlan(): void {
        console.log(`[${this.email}] Creating a new investment plan...`);
        // Add real logic here
    }

    requestRemovePlan(): void {
        console.log(`[${this.email}] Requesting to remove an investment plan...`);
        // Add real logic here
    }

    async save(): Promise<IInvestor> {
        await DB.getConnection();

        const investorDoc = await InvestorModel.findOneAndUpdate(
            { id: this.id },  // Filter by unique ID (assuming id exists)
            {
                id: this.id,
                email: this.email,
                firstName: this.firstName,
                lastName: this.lastName,
                profile: this.profile,
            },
            { upsert: true, returnDocument: "after" }  // Upsert to create if not found
        ).lean();

        // Return the document as a new instance of Investor
        return investorDoc;
    }
}

export default Investor;
