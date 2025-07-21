import { TimeDeposit } from './dto/TimeDeposit';

export interface TimeDepositServicePort {
  updateTimeDeposits(): Promise<TimeDeposit[]>;
  getTimeDeposits(): Promise<TimeDeposit[]>;
}