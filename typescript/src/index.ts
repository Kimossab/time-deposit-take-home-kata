import express from 'express';
import { TimeDepositController } from './adapters/rest/TimeDepositController';
import { TimeDepositRepository } from './adapters/database/TimeDepositRepository';
import { TimeDepositService } from './core/TimeDepositService';
import { PrismaClient } from '../generated/prisma'

const app = express();
app.use(express.json());
const prisma = new PrismaClient()

const timeDepositRepository = new TimeDepositRepository(prisma);
const timeDepositService = new TimeDepositService(timeDepositRepository);
const timeDepositController = new TimeDepositController(timeDepositService);

app.use('/', timeDepositController.router);

app.listen(3000, () => console.log('Server running on port 3000'));