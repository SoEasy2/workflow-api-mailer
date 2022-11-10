import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MailService {
    constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService,
    ) {}
    async send(message: any) {
       try{
           const { code } = message;
           if (!code) {
               throw new RpcException('Code is required');
           }
           return this.mailerService.sendMail({
               from: this.configService.get<string>('smtp.auth.user'),
               to: "roman.stasenok123@mail.ru",
               text: "Welcome to the app",
               subject: "Registration",
               template: "./registration",
               context: {
                   code,
               }
           })
       } catch (e) {
           throw new RpcException(JSON.stringify(e))
       }
    }
}
