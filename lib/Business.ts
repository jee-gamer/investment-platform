// lib/business.ts
class Business {
    id: string;
    businessName: string;
    publicData?: string;
    privateData?: string;

    constructor(init: {
        businessName: string;
        publicData?: string;
        privateData?: string;
    }) {
        this.id = crypto.randomUUID(); // Auto-generate ID
        this.businessName = init.businessName;
        this.publicData = init.publicData;
        this.privateData = init.privateData;
    }

    // Getter method to retrieve full business info
    toString(): string {
        return `Business: ${this.businessName}, Public Data: ${this.publicData}`;
    }


}

export default Business;
