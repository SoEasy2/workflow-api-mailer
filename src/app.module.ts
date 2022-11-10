import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerModule } from './shared/logger/logger.module';
import { MailModule } from './mail/mail.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    LoggerModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [ConfigModule]
})
export class AppModule {}
