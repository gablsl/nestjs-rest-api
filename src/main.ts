import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ProductSlugAlreadyExistsFilter } from './products/filters/product-slug-already-exists.filter.';
import { ValidationPipe } from '@nestjs/common';
import { NotFoundErrorFilter } from './common/filters/not-found-error.filter';
import { InvalidCredentialsFilter } from './auth/filters/invalid-credentials-error.filter';
import { EmailAlreadyExistsFilter } from './auth/filters/email-already-exists-error.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalFilters(
    new ProductSlugAlreadyExistsFilter(),
    new NotFoundErrorFilter(),
    new InvalidCredentialsFilter(),
    new EmailAlreadyExistsFilter(),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: 422,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
