// lib/investorAccount.ts
import Account from '@/lib/Account';

class InvestorAccount extends Account {
    profile?: string;

    constructor(init?: Partial<InvestorAccount>) {
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
}

export default InvestorAccount;
