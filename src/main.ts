import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DataValidationPipe } from "./pipes/data-validation.pipe";

async function bootstrap() {
  const PORT: number = (process.env.PORT as unknown) as number || 3000;
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new DataValidationPipe());
  await app.listen(PORT, () => console.log(`SERVER STARTED ON PORT: ${PORT}`));
}
bootstrap();