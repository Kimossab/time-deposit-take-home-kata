
import { PrismaClient, TimeDeposit as TimeDepositModel } from "../../../generated/prisma";
import { Decimal } from "../../../generated/prisma/runtime/library";
import { TimeDeposit } from "../../ports/dto/TimeDeposit";
import { Withdrawal } from "../../ports/dto/Withdrawal";
import { TimeDepositRepositoryPort } from "../../ports/TimeDepositRepositoryPort";

export class TimeDepositRepository implements TimeDepositRepositoryPort {
  constructor(private readonly prisma: PrismaClient) { }

  async getTimeDeposits(): Promise<TimeDeposit[]> {
    const deposits = await this.prisma.timeDeposit.findMany({ include: { withdrawals: true } });

    return deposits.map(deposit => new TimeDeposit(
      deposit.id,
      deposit.planType,
      deposit.balance.toNumber(),
      deposit.days,
      deposit.withdrawals.map(
        (withdrawal) => new Withdrawal(withdrawal.id, withdrawal.timeDepositId, withdrawal.amount.toNumber(), withdrawal.date)
      )
    ));
  }

  async updateBalances(deposits: TimeDeposit[]): Promise<TimeDeposit[]> {
    const updatePromises = deposits.map(
      deposit => this.prisma.timeDeposit.update({
        data: { balance: Decimal(deposit.balance) },
        where: { id: deposit.id }
      })
    );

    await Promise.all(updatePromises);

    return await this.getTimeDeposits();
  }
}