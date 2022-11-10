import { Module } from '@nestjs/common';
import { MaileController } from './mail.controller';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLogger } from '../shared/logger/logger.service';
import { join } from 'path';
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Module({
  imports: [
      MailerModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => {
              return {
                  transport: {
                      service: 'Gmail',
                      maxConnections: 100,
                      host: configService.get('smtp.host'),
                      port: configService.get('smtp.port'),
                      // secure: configService.get('smtp.isSecure') === 'true',
                      ignoreTLS: configService.get('smtp.isSecure') !== 'false',
                      auth: {
                          type: 'OAuth2',
                          user: configService.get('smtp.auth.user'),
                          accessToken: configService.get('smtp.auth.accessToken'),
                          clientId: configService.get('smtp.auth.clientId'),
                          clientSecret: configService.get('smtp.auth.clientSecret'),
                          refreshToken: configService.get('smtp.auth.refreshToken'),
                          accessUrl: configService.get('smtp.auth.accessUrl'),
                      },
                  },
                  template: {
                      dir: join(__dirname, 'templates'),
                      adapter: new HandlebarsAdapter(),
                      options: {
                          strict: true,
                      },
                  }
              };
          },
          inject: [ConfigService],
      }),
      ConfigModule
  ],
  controllers: [MaileController],
  providers: [MailService, AppLogger]
})
export class MailModule {}
