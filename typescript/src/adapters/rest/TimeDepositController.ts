import express, { Request, Response } from 'express';
import { TimeDepositServicePort } from "../../ports/TimeDepositServicePort";
import Logger from '../../logging/logger';
import { error } from 'console';

export class TimeDepositController {
  public readonly router = express.Router();
  private readonly logger = new Logger("TimeDepositController");

  constructor(private readonly timeDepositService: TimeDepositServicePort) {
    this.router.get('/time-deposit', this.getTimeDeposit.bind(this));
    this.router.post('/time-deposit', this.postTimeDeposit.bind(this));
  }

  async getTimeDeposit(req: Request, res: Response) {
    try {
      const timeDeposits = await this.timeDepositService.getTimeDeposits()
      res.status(200).json({ timeDeposits });
    } catch (err: any) {
      this.logger.error("Failed retrieving time deposits", { error: err });
      res.status(400).json({ error: err.message });
    }
  }

  async postTimeDeposit(req: Request, res: Response) {
    try {
      const timeDeposits = await this.timeDepositService.updateTimeDeposits()
      res.status(200).json({ timeDeposits });
    } catch (err: any) {
      this.logger.error("Failed updating time deposits", { error: err });
      res.status(400).json({ error: err.message });
    }
  }
}