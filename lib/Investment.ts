// lib/models/Investment.ts
import Investor from '@/lib/Investor'
import Business from '@/lib/Business'

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
}
