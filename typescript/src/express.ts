import { PrismaClient } from "../generated/prisma";
import express from 'express';
import Logger from "./logging/logger";
import { TimeDepositController } from './adapters/rest/TimeDepositController';
import { TimeDepositRepository } from './adapters/database/TimeDepositRepository';
import { TimeDepositService } from './core/TimeDepositService';
import { TimeDepositCalculator } from './core/TimeDepositCalculator';

const logger = new Logger("express");
export const createApp = (prisma: PrismaClient) => {

  const app = express();
  app.use(express.json());
  const timeDepositRepository = new TimeDepositRepository(prisma);
  const timeDepositCalculator = new TimeDepositCalculator();
  const timeDepositService = new TimeDepositService(timeDepositRepository, timeDepositCalculator);
  const timeDepositController = new TimeDepositController(timeDepositService);

  app.use('/', timeDepositController.router);

  app.listen(3000, () => logger.info('Server running on port 3000'));

  return app;
}