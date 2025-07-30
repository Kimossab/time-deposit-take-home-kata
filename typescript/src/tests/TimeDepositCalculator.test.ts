import { TimeDeposit } from '../ports/dto/TimeDeposit';
import { TimeDepositCalculator } from '../core/TimeDepositCalculator';

export const mockTimeDeposits: TimeDeposit[] = [
  new TimeDeposit(1, 'basic', 20000, 10, []),
  new TimeDeposit(2, 'basic', 30000, 400, []),
  new TimeDeposit(3, 'basic', 40000, 60, []),
  new TimeDeposit(4, 'student', 20000, 10, []),
  new TimeDeposit(5, 'student', 30000, 400, []),
  new TimeDeposit(6, 'student', 40000, 60, []),
  new TimeDeposit(7, 'premium', 20000, 10, []),
  new TimeDeposit(8, 'premium', 30000, 400, []),
  new TimeDeposit(9, 'premium', 40000, 60, []),
];

test('Should update balance for all deposits', () => {
  const plans = JSON.parse(JSON.stringify(mockTimeDeposits));
  const calculator = new TimeDepositCalculator();

  calculator.updateBalance(plans);

  expect(plans.map(p => p.balance)).toEqual(
    [20000, 30025, 40033.33, 20000, 30000, 40100, 20000, 30125, 40166.67]
  )
});

test('Should update balance for internal deposits', () => {
  const plans = [
    new TimeDeposit(1, 'internal', 10000, 50, []),
    new TimeDeposit(2, 'internal', 10000, 400, []),
  ];
  const calculator = new TimeDepositCalculator();

  calculator.updateBalance(plans);

  expect(plans.map(p => p.balance)).toEqual(
    [10083.33, 10000]
  )
});

test('Should update balance for expired internal deposits that exceed the limit withdrawn to 0', () => {
  const fortyDaysAgo = new Date();
  const twentyDaysAgo = new Date();

  fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const plans = [
    new TimeDeposit(1, 'internal', 10000, 400, [
      { amount: 3000, date: fortyDaysAgo, id: 1, timeDepositId: 1 },
      { amount: 6000, date: twentyDaysAgo, id: 1, timeDepositId: 1 }
    ])
  ];
  const calculator = new TimeDepositCalculator();

  calculator.updateBalance(plans);

  expect(plans.map(p => p.balance)).toEqual(
    [0]
  )
});


test('Should not update balance for expired internal deposits that exceed the limit withdrawn', () => {
  const fortyDaysAgo = new Date();
  const twentyDaysAgo = new Date();

  fortyDaysAgo.setDate(fortyDaysAgo.getDate() - 40);
  twentyDaysAgo.setDate(twentyDaysAgo.getDate() - 20);

  const plans = [
    new TimeDeposit(1, 'internal', 10000, 400, [
      { amount: 6000, date: fortyDaysAgo, id: 1, timeDepositId: 1 },
      { amount: 3000, date: twentyDaysAgo, id: 1, timeDepositId: 1 }
    ])
  ];
  const calculator = new TimeDepositCalculator();

  calculator.updateBalance(plans);

  expect(plans.map(p => p.balance)).toEqual(
    [10000]
  )
});
