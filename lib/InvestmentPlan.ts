// lib/investmentPlan.ts
import InvestorAccount from '@/lib/Investor';
import BusinessOwner from '@/lib/BusinessOwner';

type PlanStatus = 'pending' | 'approved' | 'declined';

class InvestmentPlan {
    investor: InvestorAccount;
    business: BusinessOwner;
    amount: number;
    receipt?: string;
    status: PlanStatus;

    constructor(init: {
        investor: InvestorAccount;
        business: BusinessOwner;
        amount: number;
        receipt?: string;
        status?: PlanStatus;
    }) {
        this.investor = init.investor;
        this.business = init.business;
        this.amount = init.amount;
        this.receipt = init.receipt;
        this.status = init.status ?? 'pending';
    }

    makeInvestment(): void {
        console.log(`Investor ${this.investor.getFullName()} invested $${this.amount} in ${this.business.business}`);
        this.status = 'approved';
        // Add real transaction or business logic here
    }
}

export default InvestmentPlan;
