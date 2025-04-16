import InvestmentPlan from '@/lib/InvestmentPlan';
import Investor from '@/lib/Investor';
import Business from '@/lib/Business';
import DatabaseManager from '@/lib/DatabaseManager'; // Import the DatabaseManager

// Create an instance of DatabaseManager at the top of the file
const DB = DatabaseManager.getInstance();

class InvestmentManager {
    private static instance: InvestmentManager;

    private constructor() {}

    public static getInstance(): InvestmentManager {
        if (!InvestmentManager.instance) {
            InvestmentManager.instance = new InvestmentManager();
        }
        return InvestmentManager.instance;
    }

    public async makePlan(investor: Investor, business: Business, amount: number): Promise<InvestmentPlan> {
        const newPlan = new InvestmentPlan({
            investor,
            business,
            amount,
        });

        const connection = await DB.getConnection(); // Use the DB connection here if needed
        console.log('Database connected:', connection);

        return newPlan;
    }

    public async requestRemovePlan(plan: InvestmentPlan): Promise<string> {
        const connection = await DB.getConnection(); // Use the DB connection if needed
        console.log('Database connected:', connection);
        return `Plan for investment in ${plan.business} has been removed.`;
    }

    public async acceptPlan(plan: InvestmentPlan): Promise<string> {
        plan.makeInvestment();
        const connection = await DB.getConnection(); // Use the DB connection if needed
        console.log('Database connected:', connection);
        return `Plan for investment in ${plan.business} has been accepted and processed.`;
    }

    public async declinePlan(plan: InvestmentPlan): Promise<string> {
        plan.status = 'declined';
        const connection = await DB.getConnection(); // Use the DB connection if needed
        console.log('Database connected:', connection);
        return `Plan for investment in ${plan.business} has been declined.`;
    }
}