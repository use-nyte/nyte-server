import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { App } from "supertest/types";
import { AppModule } from "../../src/app.module";

describe("Health (e2e)", () => {
  let app: INestApplication<App>;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health/live returns OK", async () => {
    await request(app.getHttpServer()).get("/health/live").expect(200).expect({ status: "ok" });
  });

  it("GET / does not expose the old starter endpoint", async () => {
    await request(app.getHttpServer()).get("/").expect(404);
  });
});
