import { Controller } from '@nestjs/common';
import {
  EventPattern,
  Payload,
  RpcException,
} from '@nestjs/microservices';
import { IKafkaMessage } from '../common/interfaces/kafka-message.interface';
import { TOPIC_MAILER_SEND } from '../common/constants';
import { AppLogger } from '../shared/logger/logger.service';
import { MailService } from './mail.service';

@Controller('mailer')
export class MaileController {
  constructor(
    private readonly mailerService: MailService,
    private readonly appLogger: AppLogger,
  ) {}

  @EventPattern(TOPIC_MAILER_SEND)
  async sendMail(@Payload() message: IKafkaMessage<any>) {
    try {
      this.appLogger.log(
        `[MaileController][${TOPIC_MAILER_SEND}] -> [sendMail]`,
      );
      return await this.mailerService.send(message.value);
    } catch (err) {
      this.appLogger.error(
        err,
        err.stack,
        `[MaileController][${TOPIC_MAILER_SEND}] -> [sendMail]`,
      );
      throw new RpcException(JSON.stringify(err));
    }
  }
}
