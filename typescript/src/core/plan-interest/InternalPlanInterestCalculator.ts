import { INTERNAL_INTEREST_RATE, INTERNAL_WITHDRAWAL_DAYS, INTERNAL_WITHDRAWN_LIMIT, MAXIMUM_INTERNAL_DAYS_FOR_INTEREST, MIN_DAYS_FOR_INTEREST } from "../../constants";
import { TimeDeposit } from "../../ports/dto/TimeDeposit";
import { Withdrawal } from "../../ports/dto/Withdrawal";
import { PlanInterestCalculator } from "./PlanInterestCalculator";


export class InternalPlanInterestCalculator implements PlanInterestCalculator {
  private getTotalWithdrawnLastDays(withdrawals: Withdrawal[]): number {
    const past = new Date();
    past.setDate(past.getDate() - INTERNAL_WITHDRAWAL_DAYS);

    return withdrawals.reduce((totalWithdrawn, withdrawal) => {
      if (withdrawal.date > past) {
        return totalWithdrawn + withdrawal.amount;
      }
      return totalWithdrawn;
    }, 0);
  }

  public calculate(timeDeposit: TimeDeposit): number {
    if (timeDeposit.days < MAXIMUM_INTERNAL_DAYS_FOR_INTEREST) {
      const interest = timeDeposit.balance * INTERNAL_INTEREST_RATE / 12;

      return Math.round((interest + Number.EPSILON) * 100) / 100;
    }

    if (this.getTotalWithdrawnLastDays(timeDeposit.withdrawals) > INTERNAL_WITHDRAWN_LIMIT) {
      return -timeDeposit.balance;
    }

    return 0;
  }
}