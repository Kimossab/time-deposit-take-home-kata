import express from 'express';
import { TimeDepositController } from './adapters/rest/TimeDepositController';
import { TimeDepositService } from './core/TimeDepositService';

const app = express();
app.use(express.json());

const timeDepositService = new TimeDepositService();
const timeDepositController = new TimeDepositController(timeDepositService);

app.use('/', timeDepositController.router);

app.listen(3000, () => console.log('Server running on port 3000'));