import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import { InjectSlack } from 'nestjs-slack-webhook';

@Injectable()
export class NotificationService {
  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook,
  ) {}

  async sendSlackNotification(message: string) {
    await this.slack.send({
      text: message || "I've got news for you...",
    });
  }
}
