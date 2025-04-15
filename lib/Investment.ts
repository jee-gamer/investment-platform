// lib/models/Investment.ts
import InvestorAccount from '@/lib/Investor'
import BusinessOwner from '@/lib/BusinessOwner'

export class Investment {
    id: string
    investor: InvestorAccount
    business: BusinessOwner
    amount: number

    constructor(investor: InvestorAccount, business: BusinessOwner, amount: number) {
        this.id = crypto.randomUUID()
        this.investor = investor
        this.business = business
        this.amount = amount
    }
}
