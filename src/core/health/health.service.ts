import { Injectable } from "@nestjs/common";

export interface LivenessResponse {
  status: "ok";
}

@Injectable()
export class HealthService {
  /**
   * Reports whether the application process is running.
   * Does not check external dependency readiness.
   */
  public getLiveness(): LivenessResponse {
    return { status: "ok" };
  }
}
