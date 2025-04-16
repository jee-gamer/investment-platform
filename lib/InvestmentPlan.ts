// lib/investmentPlan.ts
import Investor from '@/lib/Investor';
import Business from '@/lib/Business';

type PlanStatus = 'pending' | 'approved' | 'declined';

class InvestmentPlan {
    id: string;
    investor: Investor;
    business: Business;
    amount: number;
    receipt?: string;
    status: PlanStatus;

    constructor(init: {
        investor: Investor;
        business: Business;
        amount: number;
        receipt?: string;
        status?: PlanStatus;
    }) {
        this.id = crypto.randomUUID();
        this.investor = init.investor;
        this.business = init.business;
        this.amount = init.amount;
        this.receipt = init.receipt;
        this.status = init.status ?? 'pending';
    }

    makeInvestment(): void {
        console.log(`Investor ${this.investor.getFullName()} invested $${this.amount} in ${this.business}`);
        this.status = 'approved';
        // Add real transaction or business logic here
    }
}


export default InvestmentPlan;
