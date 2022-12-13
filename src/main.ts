import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { v4 as uuidv4 } from 'uuid';
import { ExceptionFilter } from './exceptions/rpc-exception.filter';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
          clientId: 'mail-service',
        },
        consumer: {
          groupId: `mailer-consumer-${uuidv4()}`,
          allowAutoTopicCreation: true,
        },
      },
    },
  );

  app.useGlobalFilters(new ExceptionFilter());

  app.enableShutdownHooks();

  await app.listen();
}
bootstrap().then(() => {
  console.log('Mailer service is running');
});
