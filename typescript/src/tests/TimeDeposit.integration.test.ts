import { PrismaClient } from "../../generated/prisma";
import { PostgreSqlContainer, StartedPostgreSqlContainer } from "@testcontainers/postgresql";
import { Client } from "pg";
import request from "supertest";
import { Express } from 'express';
import { createApp } from "../express"
import { execSync } from "node:child_process";

describe("Integration E2E test", () => {
  let container: StartedPostgreSqlContainer;
  let prismaClient: PrismaClient;
  let urlConnection: string;
  let client: Client;
  let app: Express;

  beforeAll(async () => {
    container = await new PostgreSqlContainer().start();

    client = new Client({
      host: container.getHost(),
      port: container.getPort(),
      user: container.getUsername(),
      password: container.getPassword(),
      database: container.getDatabase(),
    });
    await client.connect();
    process.env.DATABASE_URL = container.getConnectionUri();
    urlConnection = container.getConnectionUri();

    prismaClient = new PrismaClient({
      datasources: {
        db: {
          url: urlConnection,
        },
      },
    });
    execSync(`npx prisma migrate deploy`, {
      env: {
        ...process.env,
        DATABASE_URL: urlConnection,
      },
    });

    await prismaClient.timeDeposit.createMany({
      data: [
        { planType: 'basic', days: 10, balance: 20000 },
        { planType: 'basic', days: 400, balance: 30000 },
        { planType: 'basic', days: 60, balance: 40000 },
        { planType: 'student', days: 10, balance: 20000 },
        { planType: 'student', days: 400, balance: 30000 },
        { planType: 'student', days: 60, balance: 40000 },
        { planType: 'premium', days: 10, balance: 20000 },
        { planType: 'premium', days: 400, balance: 30000 },
        { planType: 'premium', days: 60, balance: 40000 }
      ]
    });

    app = createApp(prismaClient);

  }, 10000);

  afterAll(async () => {
    await prismaClient.$disconnect();
    await client.end();
    await container.stop();
  });

  describe("GET /time-deposits", () => {
    test("should return all the test data", async () => {
      const res = await request(app).get("/time-deposit");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        timeDeposits: [
          { id: 1, planType: 'basic', days: 10, balance: 20000, withdrawals: [] },
          { id: 2, planType: 'basic', days: 400, balance: 30000, withdrawals: [] },
          { id: 3, planType: 'basic', days: 60, balance: 40000, withdrawals: [] },
          { id: 4, planType: 'student', days: 10, balance: 20000, withdrawals: [] },
          { id: 5, planType: 'student', days: 400, balance: 30000, withdrawals: [] },
          { id: 6, planType: 'student', days: 60, balance: 40000, withdrawals: [] },
          { id: 7, planType: 'premium', days: 10, balance: 20000, withdrawals: [] },
          { id: 8, planType: 'premium', days: 400, balance: 30000, withdrawals: [] },
          { id: 9, planType: 'premium', days: 60, balance: 40000, withdrawals: [] }]
      });
    }, 10000);
  });


  describe("POST /time-deposits", () => {
    test("should update the balance for the time deposits", async () => {
      const res = await request(app).post("/time-deposit");
      expect(res.status).toBe(200);
      expect(res.body).toEqual({
        timeDeposits: expect.arrayContaining([
          { id: 1, planType: 'basic', days: 10, balance: 20000, withdrawals: [] },
          { id: 2, planType: 'basic', days: 400, balance: 30025, withdrawals: [] },
          { id: 3, planType: 'basic', days: 60, balance: 40033.33, withdrawals: [] },
          { id: 4, planType: 'student', days: 10, balance: 20000, withdrawals: [] },
          { id: 5, planType: 'student', days: 400, balance: 30000, withdrawals: [] },
          { id: 6, planType: 'student', days: 60, balance: 40100, withdrawals: [] },
          { id: 7, planType: 'premium', days: 10, balance: 20000, withdrawals: [] },
          { id: 8, planType: 'premium', days: 400, balance: 30125, withdrawals: [] },
          { id: 9, planType: 'premium', days: 60, balance: 40166.67, withdrawals: [] }
        ])
      });
    }, 10000);
  });

})