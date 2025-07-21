import { TimeDeposit } from "../ports/dto/TimeDeposit";
import { TimeDepositServicePort } from "../ports/TimeDepositServicePort";
import { TimeDepositRepositoryPort } from "../ports/TimeDepositRepositoryPort";

export class TimeDepositService implements TimeDepositServicePort {
  constructor(private readonly timeDepositRepository: TimeDepositRepositoryPort) { }

  async updateTimeDeposits(): Promise<TimeDeposit[]> {
    throw new Error("Method not implemented.");
  }

  async getTimeDeposits(): Promise<TimeDeposit[]> {
    const deposits = await this.timeDepositRepository.getTimeDeposits();

    return deposits;
  }
}