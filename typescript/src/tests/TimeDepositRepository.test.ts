import { PrismaClient } from "../../generated/prisma";
import { mockDeep } from 'jest-mock-extended';
import { TimeDepositRepository } from '../adapters/database/TimeDepositRepository';
import { mockTimeDepositsDB } from "./mockData/timeDepositsDB";

const mockPrisma = mockDeep<PrismaClient>();

describe("Get Time Deposits", () => {
  const repository = new TimeDepositRepository(mockPrisma);

  beforeAll(() => {
    mockPrisma.timeDeposit.findMany.mockResolvedValue(mockTimeDepositsDB)
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
        planType: 'basic',
        days: 400,
        balance: 300,
        withdrawals: []
      },
      { id: 3, planType: 'basic', days: 60, balance: 400, withdrawals: [] },
      {
        id: 4,
        planType: 'student',
        days: 10,
        balance: 200,
        withdrawals: []
      },
      {
        id: 5,
        planType: 'student',
        days: 400,
        balance: 300,
        withdrawals: []
      },
      {
        id: 6,
        planType: 'student',
        days: 60,
        balance: 400,
        withdrawals: []
      },
      {
        id: 7,
        planType: 'premium',
        days: 10,
        balance: 200,
        withdrawals: []
      },
      {
        id: 8,
        planType: 'premium',
        days: 400,
        balance: 300,
        withdrawals: []
      },
      {
        id: 9,
        planType: 'premium',
        days: 60,
        balance: 400,
        withdrawals: []
      }
    ])
  });
});
