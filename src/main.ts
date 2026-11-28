import { ConsoleLogger, Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "#server/app.module";

async function bootstrap(): Promise<void> {
  const port = Number(process.env.PORT ?? "52470");
  const host = process.env.HOST ?? "127.0.0.1";

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535");
  }

  const app = await NestFactory.create(AppModule, {
    logger: new ConsoleLogger({
      prefix: "Nyte",
      timestamp: true
    })
  });

  app.enableShutdownHooks();

  await app.listen(port, host);

  new Logger("Bootstrap").log(`Nyte Server listening on ${host}:${port}`);
}

await bootstrap();
