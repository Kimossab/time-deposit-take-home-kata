import { TimeDeposit } from '../ports/dto/TimeDeposit';
import { PlanInterestCalculator } from './plan-interest/PlanInterestCalculator';
import { BasicPlanInterestCalculator } from './plan-interest/BasicPlanInterestCalculator';
import { StudentPlanInterestCalculator } from './plan-interest/StudentPlanInterestCalculator';
import { PremiumPlanInterestCalculator } from './plan-interest/PremiumPlanInterestCalculator';
import Logger from '../logging/logger';

enum PlanTypes {
  Basic = 'basic',
  Student = 'student',
  Premium = 'premium',
}

export class TimeDepositCalculator {
  private readonly logger = new Logger("TimeDepositCalculator");

  private calculators: Record<PlanTypes, PlanInterestCalculator> = {
    [PlanTypes.Basic]: new BasicPlanInterestCalculator(),
    [PlanTypes.Student]: new StudentPlanInterestCalculator(),
    [PlanTypes.Premium]: new PremiumPlanInterestCalculator(),
  }

  public updateBalance(timeDeposits: TimeDeposit[]) {
    this.logger.debug("Updating balance for all time deposits", { count: timeDeposits.length });

    for (const deposit of timeDeposits) {
      if (this.calculators[deposit.planType]) {
        const interest = this.calculators[deposit.planType].calculate(deposit);
        deposit.balance += interest;
      }
    }

    this.logger.info("Got all the balances updated.");
  }
}
