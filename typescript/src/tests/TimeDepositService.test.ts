import { TimeDepositService } from "../core/TimeDepositService";
import { TimeDepositRepositoryPort } from "../ports/TimeDepositRepositoryPort";
import { TimeDepositCalculator } from "../core/TimeDepositCalculator";
import { TimeDeposit } from "../ports/dto/TimeDeposit";

describe("TimeDepositService", () => {
  let mockRepository: jest.Mocked<TimeDepositRepositoryPort>;
  let mockCalculator: jest.Mocked<TimeDepositCalculator>;
  let service: TimeDepositService;

  const deposits: TimeDeposit[] = [
    { id: 1, planType: "basic", days: 10, balance: 200, withdrawals: [] },
    { id: 2, planType: "student", days: 20, balance: 300, withdrawals: [] }
  ];

  beforeEach(() => {
    mockRepository = {
      getTimeDeposits: jest.fn().mockResolvedValue(deposits),
      updateBalances: jest.fn().mockResolvedValue(deposits)
    } as any;
    mockCalculator = {
      updateBalance: jest.fn()
    } as any;
    service = new TimeDepositService(mockRepository, mockCalculator);
  });

  test("updateTimeDeposits should update balances and return updated deposits", async () => {
    const result = await service.updateTimeDeposits();

    expect(mockRepository.getTimeDeposits).toHaveBeenCalled();
    expect(mockCalculator.updateBalance).toHaveBeenCalledWith(deposits);
    expect(mockRepository.updateBalances).toHaveBeenCalledWith(deposits);
    expect(result).toEqual(deposits);
  });

  test("getTimeDeposits should return deposits from repository", async () => {
    const result = await service.getTimeDeposits();

    expect(mockRepository.getTimeDeposits).toHaveBeenCalled();
    expect(result).toEqual(deposits);
  });
});