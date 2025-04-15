// account.ts
abstract class Account {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;

    constructor(init?: Partial<Account>) {
        Object.assign(this, init);
    }

    getFullName(): string {
        return `${this.firstName ?? ''} ${this.lastName ?? ''}`.trim();
    }

    abstract getAccountType(): string;
}

export default Account;
