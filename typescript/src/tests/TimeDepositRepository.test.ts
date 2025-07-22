import { Prisma, PrismaClient, TimeDeposit } from "../../generated/prisma";
import { mockDeep } from 'jest-mock-extended';
import { TimeDepositRepository } from '../adapters/database/TimeDepositRepository';
import { Decimal } from "../../generated/prisma/runtime/library";

const mockPrisma = mockDeep<PrismaClient>();

describe("TimeDepositRepository", () => {
  const repository = new TimeDepositRepository(mockPrisma);

  beforeAll(() => {
    mockPrisma.timeDeposit.update.mockResolvedValue({} as TimeDeposit);
    mockPrisma.timeDeposit.findMany.mockResolvedValue([
      {
        id: 1,
        planType: 'basic',
        days: 10,
        balance: Decimal(200),
        withdrawals: [
          {
            id: 1,
            timeDepositId: 1,
            amount: Decimal(10),
            date: new Date(2025, 5, 1, 12, 35)
          }
        ]
      },
      {
        id: 2,
        planType: 'student',
        days: 10,
        balance: Decimal(200),
        withdrawals: []
      },
      {
        id: 3,
        planType: 'premium',
        days: 10,
        balance: Decimal(200),
        withdrawals: []
      },
    ] as Prisma.TimeDepositGetPayload<{ include: { withdrawals: true } }>[]);

    mockPrisma.$transaction.mockImplementation(async (cb: any) => {
      if (typeof cb === "function") {
        return await cb();
      }
      // If it's an array of promises, resolve them
      return Promise.all(cb);
    });
  })

  test('Should correctly get and map data from the database', async () => {
    expect(
      await repository.getTimeDeposits()
    ).toEqual([
      {
        id: 1,
        planType: 'basic',
        days: 10,
        balance: 200,
        withdrawals: [
          {
            id: 1,
            timeDepositId: 1,
            amount: 10,
            date: new Date(2025, 5, 1, 12, 35)
          }
        ]
      },
      {
        id: 2,
        planType: 'student',
        days: 10,
        balance: 200,
        withdrawals: []
      },
      {
        id: 3,
        planType: 'premium',
        days: 10,
        balance: 200,
        withdrawals: []
      }
    ]);
  });

  test('Should correctly update the balances and then return the data', async () => {
    const result = await repository.updateBalances([
      {
        id: 1,
        planType: 'basic',
        days: 10,
        balance: 200,
        withdrawals: [
          {
            id: 1,
            timeDepositId: 1,
            amount: 10,
            date: new Date(2025, 5, 1, 12, 35)
          }
        ]
      },
      {
        id: 2,
        planType: 'student',
        days: 10,
        balance: 200,
        withdrawals: []
      },
      {
        id: 3,
        planType: 'premium',
        days: 10,
        balance: 200,
        withdrawals: []
      }
    ]);

    expect(mockPrisma.timeDeposit.update).toHaveBeenCalledTimes(3);

    expect(
      result
    ).toEqual([
      {
        id: 1,
        planType: 'basic',
        days: 10,
        balance: 200,
        withdrawals: [
          {
            id: 1,
            timeDepositId: 1,
            amount: 10,
            date: new Date(2025, 5, 1, 12, 35)
          }
        ]
      },
      {
        id: 2,
        planType: 'student',
        days: 10,
        balance: 200,
        withdrawals: []
      },
      {
        id: 3,
        planType: 'premium',
        days: 10,
        balance: 200,
        withdrawals: []
      }
    ]);
  });
});
