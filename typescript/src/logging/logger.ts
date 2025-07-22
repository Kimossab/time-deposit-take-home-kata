import {
  createLogger,
  format,
  transports,
} from "winston";

export interface ILogger {
  info(message: string, ...data: unknown[]): void;
  debug(message: string, ...data: unknown[]): void;
  error(message: string, ...data: unknown[]): void;
}

class Logger implements ILogger {
  private _winston;

  constructor(module: string) {
    const consoleTransport = new transports.Console({
      format: format.combine(
        format.timestamp(),
        format.simple(),
        format.colorize({ all: true }),
      ),
    });
    this._winston = createLogger({
      level: process.env.NODE_ENV == "test" ? "error" : "silly",
      defaultMeta: { module },
      transports: [consoleTransport],
    });
  }

  public info(message: string, ...data: unknown[]) {
    this._winston.info(message, ...data);
  }

  public warn(message: string, ...data: unknown[]) {
    this._winston.warn(message, ...data);
  }

  public debug(message: string, ...data: unknown[]) {
    this._winston.debug(message, ...data);
  }

  public error(message: string, ...data: unknown[]) {
    this._winston.error(message, ...data);
  }
}

export default Logger;
