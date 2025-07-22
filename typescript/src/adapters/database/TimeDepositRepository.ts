
import { PrismaClient } from "../../../generated/prisma";
import { Decimal } from "../../../generated/prisma/runtime/library";
import Logger from "../../logging/logger";
import { TimeDeposit } from "../../ports/dto/TimeDeposit";
import { Withdrawal } from "../../ports/dto/Withdrawal";
import { TimeDepositRepositoryPort } from "../../ports/TimeDepositRepositoryPort";

export class TimeDepositRepository implements TimeDepositRepositoryPort {
  private readonly logger = new Logger("TimeDepositRepository");

  constructor(private readonly prisma: PrismaClient) { }

  async getTimeDeposits(): Promise<TimeDeposit[]> {
    const deposits = await this.prisma.timeDeposit.findMany({ include: { withdrawals: true } });

    const data = deposits.map(deposit => new TimeDeposit(
      deposit.id,
      deposit.planType,
      deposit.balance.toNumber(),
      deposit.days,
      deposit.withdrawals.map(
        (withdrawal) => new Withdrawal(withdrawal.id, withdrawal.timeDepositId, withdrawal.amount.toNumber(), withdrawal.date)
      )
    ));

    this.logger.info("Retrieved all time deposits.");

    return data;
  }

  async updateBalances(deposits: TimeDeposit[]): Promise<TimeDeposit[]> {
    const updatePromises = deposits.map(
      deposit => this.prisma.timeDeposit.update({
        data: { balance: Decimal(deposit.balance) },
        where: { id: deposit.id }
      })
    );

    this.logger.info("Updating all the time deposit balances.");

    await Promise.all(updatePromises);

    this.logger.info("Updated all time deposit balances successfully.");

    return await this.getTimeDeposits();
  }
}