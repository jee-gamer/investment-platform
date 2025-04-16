import BusinessModel from '@/models/Business';  // Assuming you have a BusinessModel defined
import Business from '@/lib/Business';
import DatabaseManager from "@/lib/DatabaseManager";  // Assuming Business is a class or interface that represents your business object

const DB = DatabaseManager.getInstance();

export default class BusinessRepo {

    static async create(business: Business): Promise<Business> {
        await DB.getConnection();


        const newBusiness = new BusinessModel({
            id: business.id,
            businessName: business.businessName,
            publicData: business.publicData,
            privateData: business.privateData,
        });

        return newBusiness.save();
    }

    static async update(business: Business): Promise<Business | null> {
        await DB.getConnection();


        return BusinessModel.findOneAndUpdate(
            { id: business.id },
            {
                businessName: business.businessName,
                publicData: business.publicData,
                privateData: business.privateData,
            },
            { new: true }  // Return the updated business
        );
    }

    static async getById(id: string): Promise<Business | null> {
        await DB.getConnection();

        return BusinessModel.findOne({ id }).exec();
    }

    static async getAll(): Promise<Business[]> {
        await DB.getConnection();

        return BusinessModel.find().exec();
    }

    static async delete(id: string): Promise<Business | null> {
        await DB.getConnection();

        return BusinessModel.findOneAndDelete({ id }).exec();
    }
}
