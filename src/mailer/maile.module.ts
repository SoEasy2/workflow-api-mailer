import { Module } from '@nestjs/common';
import { MaileController } from './maile.controller';
import { MaileService } from './maile.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppLogger } from '../shared/logger/logger.service';

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
                  // template: {
                  //     dir: `${process.cwd()}/templates/`,
                  //     adapter: new PugAdapter(),
                  // },
              };
          },
          inject: [ConfigService],
      }),
      ConfigModule
  ],
  controllers: [MaileController],
  providers: [MaileService, AppLogger]
})
export class MaileModule {}
