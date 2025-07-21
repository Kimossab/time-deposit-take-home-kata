import { TimeDeposit } from "./dto/TimeDeposit"

export interface TimeDepositServicePort {
  updateTimeDeposit(): TimeDeposit;
  getTimeDeposits(): TimeDeposit[];
}