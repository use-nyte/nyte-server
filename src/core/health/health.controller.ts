import { Controller, Get } from "@nestjs/common";
import { HealthService } from "./health.service";
import type { LivenessResponse } from "./health.service";

@Controller("health")
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  /**
   * Returns the application's liveness status.
   */
  @Get("live")
  public getLiveness(): LivenessResponse {
    return this.healthService.getLiveness();
  }
}
