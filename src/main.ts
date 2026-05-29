import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConsoleLogger } from "@nestjs/common";

void (async (): Promise<void> => {
  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: "Nyte"
    })
  });

  await app.listen(52470);
})();
