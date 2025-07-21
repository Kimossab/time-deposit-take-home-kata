import { Decimal } from "../../../generated/prisma/runtime/library";

export const mockTimeDepositsDB = [
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
    planType: 'basic',
    days: 400,
    balance: Decimal(300),
    withdrawals: []
  },
  { id: 3, planType: 'basic', days: 60, balance: Decimal(400), withdrawals: [] },
  {
    id: 4,
    planType: 'student',
    days: 10,
    balance: Decimal(200),
    withdrawals: []
  },
  {
    id: 5,
    planType: 'student',
    days: 400,
    balance: Decimal(300),
    withdrawals: []
  },
  {
    id: 6,
    planType: 'student',
    days: 60,
    balance: Decimal(400),
    withdrawals: []
  },
  {
    id: 7,
    planType: 'premium',
    days: 10,
    balance: Decimal(200),
    withdrawals: []
  },
  {
    id: 8,
    planType: 'premium',
    days: 400,
    balance: Decimal(300),
    withdrawals: []
  },
  {
    id: 9,
    planType: 'premium',
    days: 60,
    balance: Decimal(400),
    withdrawals: []
  }
]