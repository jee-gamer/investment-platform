// lib/businessOwner.ts
import Account from '@/lib/Account';
import Business from "@/lib/Business";
import BusinessOwnerModel, {IBusinessOwner} from "@/models/BusinessOwner";
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();

class BusinessOwner extends Account {
    business: Business;

    constructor(init: Partial<BusinessOwner>) {
        super(init);
        this.business = init.business!;
    }

    getAccountType(): string {
        return 'BusinessOwner';
    }

    acceptPlan(plan: any): void {
        console.log(`[${this.email}] Accepted plan:`, plan);
        // Actual logic here, e.g. this.business?.plans.push(plan)
    }

    declinePlan(plan: any): void {
        console.log(`[${this.email}] Declined plan:`, plan);
        // Actual logic here
    }

    async save(): Promise<IBusinessOwner> {
        await DB.getConnection();
        const businessDoc = await this.business.save()
        const doc = await BusinessOwnerModel.findOneAndUpdate(
            { id: this.id },              // filter
            {
                id: this.id,
                firstName: this.firstName,
                lastName: this.lastName,
                email: this.email,
                phone: this.phone,
                business: businessDoc._id,
            },          // update
            { upsert: true, returnDocument: "after" }
        ).lean()
        return doc;
    }
}

export default BusinessOwner;
