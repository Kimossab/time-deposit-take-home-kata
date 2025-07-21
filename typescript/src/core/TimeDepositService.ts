import { TimeDeposit } from "../ports/dto/TimeDeposit";
import { TimeDepositServicePort } from "../ports/TimeDepositServicePort";

export class TimeDepositService implements TimeDepositServicePort {
  updateTimeDeposit(): TimeDeposit {
    throw new Error("Method not implemented.");
  }
  getTimeDeposits(): TimeDeposit[] {
    throw new Error("Method not implemented.");
  }
}