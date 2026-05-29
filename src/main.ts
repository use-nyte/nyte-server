import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConsoleLogger, Logger } from "@nestjs/common";

void (async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: "Nyte",
      timestamp: true
    })
  });

  const logger = new Logger("Bootstrap");

  await app.listen(52470, () => {
    logger.log("Nyte server is running on port 52470");
  });
})();
