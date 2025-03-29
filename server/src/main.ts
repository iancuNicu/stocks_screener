import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidateInputPipe } from './pipes/validate.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
    res.header('Access-Control-Expose-Headers', 'Authorization, Accept, X-Application')
    next();
  });

  app.enableCors({
    origin: "*",
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
    allowedHeaders: "*"
  });

  app.useGlobalPipes(new ValidateInputPipe());
  await app.listen(4000);
}
bootstrap();
