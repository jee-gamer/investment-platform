// lib/businessOwner.ts
import Account from '@/lib/Account';

class BusinessOwner extends Account {
    business?: string;

    constructor(init?: Partial<BusinessOwner>) {
        super(init);
        this.business = init?.business;
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
}

export default BusinessOwner;
