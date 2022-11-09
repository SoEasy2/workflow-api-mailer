import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MaileService {
    constructor(
        private readonly mailerService: MailerService,
        private configService: ConfigService,
    ) {}
    async send(message: any) {
        return await this.mailerService.sendMail({
            from: this.configService.get<string>('smtp.auth.user'),
            to: "roman.stasenok123@mail.ru",
            text: "CODSADSAASD",
            subject: "test",
        })
    }
}
