import { BASIC_INTEREST_RATE, MIN_DAYS_FOR_INTEREST } from "../../constants";
import { TimeDeposit } from "../../ports/dto/TimeDeposit";
import { PlanInterestCalculator } from "./PlanInterestCalculator";


export class BasicPlanInterestCalculator implements PlanInterestCalculator {
  public calculate(timeDeposit: TimeDeposit): number {
    if (timeDeposit.days > MIN_DAYS_FOR_INTEREST) {
      const interest = timeDeposit.balance * BASIC_INTEREST_RATE / 12;

      return Math.round((interest + Number.EPSILON) * 100) / 100;
    }
    return 0
  }
}