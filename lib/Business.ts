// lib/business.ts
import BusinessModel, { IBusiness } from "@/models/Business";
import {Document} from "mongoose";
import DatabaseManager from "@/lib/DatabaseManager";

const DB = DatabaseManager.getInstance();

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

    async save(): Promise<IBusiness> {
        await DB.getConnection();
        const doc = await BusinessModel.findOneAndUpdate(
            { id: this.id },              // filter
            { ...this },          // update
            { upsert: true, returnDocument: "after" }
        ).lean()
        return doc;
    }


}

export default Business;
