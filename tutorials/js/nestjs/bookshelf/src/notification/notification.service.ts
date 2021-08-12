import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import { InjectSlack } from 'nestjs-slack-webhook';
import { IncomingWebhook as TeamsIncomingWebhook } from 'ms-teams-webhook';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';

@Injectable()
export class NotificationService {
  teams: TeamsIncomingWebhook;
  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook,
    @InjectTwilio()
    private readonly twilio: TwilioClient,
  ) {
    console.log({
      TEAMS: process.env.MS_TEAMS_WEBHOOK_URL,
      SLACK: process.env.SLACK_WEBHOOK_URL,
      TWILIO_ACCOUNT_SID:process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN:process.env.TWILIO_AUTH_TOKEN,
      TWILIO_PHONE_NUMBER:process.env.TWILIO_PHONE_NUMBER,
      TWILIO_TARGET_PHONE_NUMBER:process.env.TWILIO_TARGET_PHONE_NUMBER,
    });
    // initiallize team hook
    this.teams = new TeamsIncomingWebhook(process.env.MS_TEAMS_WEBHOOK_URL);
  }

  // sends notification to all services
  async broadcastNotification(message: string){
    await this.sendTeamsNotification(message);
    await this.sendSlackNotification(message);
    await this.sendSMS(message);
  }

  async sendSlackNotification(message: string) {
    await this.slack.send({
      text: message || "New Item added",
    });
  }

  async sendTeamsNotification(message: string) {
    await this.teams.send(
      JSON.stringify({
        '@type': 'MessageCard',
        '@context': 'https://schema.org/extensions',
        summary: 'NotificationTest Summary',
        themeColor: '0078D7',
        title: 'New NotificationTest Message',
        sections: [
          {
            activityTitle: 'Mushtaq Ali',
            activitySubtitle: '9/13/2016, 11:46am',
            activityImage:
              'https://avatars1.githubusercontent.com/u/6991154?s=460&u=1bb0de6216b3b5535cd651b2ef80042bb3f645b4&v=4',
            text: message || "New Item added",
          },
        ],
      }),
    );
  }

  async sendSMS(message: string) {
    try {
      return await this.twilio.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: process.env.TWILIO_TARGET_PHONE_NUMBER,
      });
    } catch (e) {
      return e;
    }
  }
}
