import { TimeDeposit } from "../../ports/dto/TimeDeposit";

export interface PlanInterestCalculator {
  calculate(timeDeposit: TimeDeposit): number;
}