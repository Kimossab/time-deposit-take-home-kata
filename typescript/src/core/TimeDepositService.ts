import { TimeDeposit } from "../ports/dto/TimeDeposit";
import { TimeDepositServicePort } from "../ports/TimeDepositServicePort";
import { TimeDepositRepositoryPort } from "../ports/TimeDepositRepositoryPort";
import { TimeDepositCalculator } from "./TimeDepositCalculator";

export class TimeDepositService implements TimeDepositServicePort {
  constructor(
    private readonly timeDepositRepository: TimeDepositRepositoryPort,
    private readonly timeDepositCalculator: TimeDepositCalculator
  ) { }

  async updateTimeDeposits(): Promise<TimeDeposit[]> {
    const deposits = await this.timeDepositRepository.getTimeDeposits();

    this.timeDepositCalculator.updateBalance(deposits);

    //update database

    return deposits;
  }

  async getTimeDeposits(): Promise<TimeDeposit[]> {
    const deposits = await this.timeDepositRepository.getTimeDeposits();

    return deposits;
  }
}