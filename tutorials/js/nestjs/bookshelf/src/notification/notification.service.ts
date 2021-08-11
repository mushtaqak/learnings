import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import { InjectSlack } from 'nestjs-slack-webhook';
import { IncomingWebhook as TeamsIncomingWebhook } from 'ms-teams-webhook';

@Injectable()
export class NotificationService {
  teams: TeamsIncomingWebhook;
  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook,
  ) {
    // Read a url from the environment variables
    const MS_TEAMS_WEBHOOK_URL = 'MS_TEAMS_WEBHOOK_URL';
    // Initialize teams
    this.teams = new TeamsIncomingWebhook(MS_TEAMS_WEBHOOK_URL);
  }

  async broadcastNotification(message: string){
    // await this.sendSlackNotification(message);
    await this.sendTeamsNotification(message);
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
}
