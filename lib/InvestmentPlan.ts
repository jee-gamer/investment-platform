// lib/investmentPlan.ts
import Investor from '@/lib/Investor';
import Business from '@/lib/Business';
import Investment from '@/lib/Investment';

export type PlanStatus = 'pending' | 'approved' | 'declined';

export type TInvestmentPlan = {
    investor: Investor;
    business: Business;
    amount: number;
    receipt?: string;
    status?: PlanStatus;
};

class InvestmentPlan {
    id: string;
    investor: Investor;
    business: Business;
    amount: number;
    receipt?: string;
    status: PlanStatus;

    constructor(init: TInvestmentPlan) {
        this.id = crypto.randomUUID();
        this.investor = init.investor;
        this.business = init.business;
        this.amount = init.amount;
        this.receipt = init.receipt;
        this.status = init.status ?? 'pending';
    }

    makeInvestment(): Investment {
        console.log(`Investor ${this.investor.getFullName()} invested $${this.amount} in ${this.business}`);
        this.status = 'approved';
        return new Investment(this.investor, this.business, this.amount);
    }
}


export default InvestmentPlan;
