import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import type { Server } from "node:http";
import request from "supertest";
import { AppModule } from "#server/app.module";

describe("Health HTTP endpoints", () => {
  let app: INestApplication<Server>;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app?.close();
  });

  it("GET /health/live returns OK", async () => {
    await request(app.getHttpServer()).get("/health/live").expect(200).expect({ status: "ok" });
  });

  it("GET / returns 404", async () => {
    await request(app.getHttpServer()).get("/").expect(404);
  });
});
