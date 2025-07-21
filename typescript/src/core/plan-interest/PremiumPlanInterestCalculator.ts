import { MIN_DAYS_FOR_INTEREST, MIN_PREMIUM_DAYS_FOR_INTEREST, PREMIUM_INTEREST_RATE, STUDENT_INTEREST_RATE } from "../../constants";
import { TimeDeposit } from "../../ports/dto/TimeDeposit";
import { PlanInterestCalculator } from "./PlanInterestCalculator";


export class PremiumPlanInterestCalculator implements PlanInterestCalculator {
  public calculate(timeDeposit: TimeDeposit): number {
    if (timeDeposit.days > MIN_DAYS_FOR_INTEREST && timeDeposit.days > MIN_PREMIUM_DAYS_FOR_INTEREST) {
      const interest = timeDeposit.balance * PREMIUM_INTEREST_RATE / 12;

      return Math.round((interest + Number.EPSILON) * 100) / 100;
    }
    return 0
  }
}