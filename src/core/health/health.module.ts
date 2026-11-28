import { Module } from "@nestjs/common";
import { HealthController } from "#server/core/health/health.controller";
import { HealthService } from "#server/core/health/health.service";

@Module({
  controllers: [HealthController],
  providers: [HealthService]
})
export class HealthModule {}
