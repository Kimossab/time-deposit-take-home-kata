import { PrismaClient } from '../generated/prisma';
import Logger from './logging/logger';
import { createApp } from './express';

const logger = new Logger("server");

const prisma = new PrismaClient()

createApp(prisma);

const terminate = async (cause: string, code: number | undefined = undefined) => {
  logger.info(`Application termination ${cause}`, { cause, code });
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", async () => await terminate("SIGINT"));
process.on("SIGTERM", async () => await terminate("SIGTERM"));
process.on("exit", async (code: number) => await terminate("exit", code));
process.on("uncaughtExceptionMonitor", (reason, promise) => {
  logger.error("Unhandled Rejection", reason, promise);
});
process.on("warning", (warning) => {
  logger.warn("Application warning caught", warning);
});
