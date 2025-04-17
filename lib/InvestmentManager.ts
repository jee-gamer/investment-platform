import InvestmentPlan, { PlanStatus, TInvestmentPlan } from '@/lib/InvestmentPlan';
import InvestmentPlanRepo from "@/lib/InvestmentPlanRepo";
import InvestmentPlanModel, {IInvestmentPlan} from "@/models/InvestmentPlan";
import InvestmentModel from "@/models/Investment";
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

    public async makePlan(plan: TInvestmentPlan): Promise<InvestmentPlan> {
        const newPlan = new InvestmentPlan(plan);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const doc = await InvestmentPlanRepo.create(newPlan) // unused doc
        return newPlan;
    }

    public async requestRemovePlan(plan: InvestmentPlan): Promise<string> {
        const exist = await (InvestmentPlanModel.findOne({ id: plan.id }));
        if (!exist) {
            return `The plan does not exist in database`;
        }
        exist.status = "requestToBeRemoved"
        await exist.save()
        return `Successfully requested to remove plan`;
    }

    public async acceptPlan(plan: InvestmentPlan): Promise<string> {
        await DB.getConnection()
        const investment = plan.makeInvestment();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const doc = InvestmentModel.create(investment);

        return `Plan for investment in ${plan.business} has been accepted.`;
    }

    public async declinePlan(plan: InvestmentPlan): Promise<string> {
        await DB.getConnection()
        plan.status = 'declined';

        return `Plan for investment in ${plan.business} has been declined.`;
    }
}