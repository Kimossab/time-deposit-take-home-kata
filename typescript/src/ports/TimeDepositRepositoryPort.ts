import { TimeDeposit } from "./dto/TimeDeposit";

export interface TimeDepositRepositoryPort {
  getTimeDeposits(): Promise<TimeDeposit[]>;
}