import express, { Request, Response } from 'express';
import { TimeDepositServicePort } from "../../ports/TimeDepositServicePort";

export class TimeDepositController {
  public readonly router = express.Router();

  constructor(private readonly timeDepositService: TimeDepositServicePort) {
    this.router.get('/time-deposit', this.getTimeDeposit.bind(this));
    this.router.patch('/time-deposit', this.patchTimeDeposit.bind(this));
  }

  async getTimeDeposit(req: Request, res: Response) {
    try {
      const timeDeposits = await this.timeDepositService.getTimeDeposits()
      res.status(200).json({ timeDeposits });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async patchTimeDeposit(req: Request, res: Response) {
    try {
      const timeDeposit = await this.timeDepositService.updateTimeDeposits()
      res.status(204).json({ timeDeposit });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}