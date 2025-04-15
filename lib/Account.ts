// account.ts
import { randomUUID } from 'crypto';

abstract class Account {
    id: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;

    constructor(init?: Partial<Omit<Account, 'id'>>) {
        this.id = randomUUID(); // Auto-generate ID
        Object.assign(this, init);
    }

    getFullName(): string {
        return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim();
    }

    abstract getAccountType(): string;
}

export default Account;
