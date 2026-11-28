import { HealthService } from "#server/core/health/health.service";

describe("HealthService", () => {
  it("reports an OK liveness status", () => {
    const service = new HealthService();

    expect(service.getLiveness()).toEqual({
      status: "ok"
    });
  });
});
