import { HealthService } from "../../src/core/health/health.service";

describe("HealthService", () => {
  let service: HealthService;

  beforeEach(() => {
    service = new HealthService();
  });

  it("returns an OK liveness status", () => {
    expect(service.getLiveness()).toEqual({
      status: "ok"
    });
  });
});
