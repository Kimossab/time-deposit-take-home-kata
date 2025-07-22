import { PrismaClient } from "../generated/prisma";
import express, { Request, Response, NextFunction } from 'express';
import Logger from "./logging/logger";
import { TimeDepositController } from './adapters/rest/TimeDepositController';
import { TimeDepositRepository } from './adapters/database/TimeDepositRepository';
import { TimeDepositService } from './core/TimeDepositService';
import { TimeDepositCalculator } from './core/TimeDepositCalculator';

const logger = new Logger("express");

const loggerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const ip = req.ip;
  const time = new Date().toLocaleString();
  const method = req.method;
  const url = req.originalUrl;

  logger.info("Received request", {
    time,
    ip,
    method,
    url
  });

  next();
};

export const createApp = (prisma: PrismaClient) => {

  const app = express();
  app.use(express.json());
  app.use(loggerMiddleware);
  const timeDepositRepository = new TimeDepositRepository(prisma);
  const timeDepositCalculator = new TimeDepositCalculator();
  const timeDepositService = new TimeDepositService(timeDepositRepository, timeDepositCalculator);
  const timeDepositController = new TimeDepositController(timeDepositService);

  app.use('/', timeDepositController.router);

  app.listen(3000, () => logger.info('Server running on port 3000'));

  return app;
}