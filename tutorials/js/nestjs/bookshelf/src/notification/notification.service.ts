import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import { InjectSlack } from 'nestjs-slack-webhook';
import { IncomingWebhook as TeamsIncomingWebhook } from 'ms-teams-webhook';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
// import Pusher from 'pusher'; // TypeError: pusher_1.default is not a constructor
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Pusher = require('pusher');

// import webpush from 'web-push'; // web_push_1.default.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpush = require('web-push');

const publicVapidKey =
  'BJthRQ5myDgc7OSXzPCMftGw-n16F7zQBEN7EUD6XxcfTTvrLGWSIG7y_JxiWtVlCFua0S8MTB5rPziBqNx1qIo';
const privateVapidKey = '3KzvKasA2SoCxsp0iIG_o9B0Ozvl1XDwI63JRKNIWBM';

webpush.setVapidDetails(
  'mailto:test@test.com',
  publicVapidKey,
  privateVapidKey,
);

@Injectable()
export class NotificationService {
  subscribers = [];
  teams: TeamsIncomingWebhook;
  pusher;

  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook,
    @InjectTwilio()
    private readonly twilio: TwilioClient,
  ) {
    console.log({
      TEAMS: process.env.MS_TEAMS_WEBHOOK_URL,
      SLACK: process.env.SLACK_WEBHOOK_URL,
      TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
      TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
      TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER,
      TWILIO_TARGET_PHONE_NUMBER: process.env.TWILIO_TARGET_PHONE_NUMBER,
      PUSHER_APP_ID: process.env.PUSHER_APP_ID,
      PUSHER_APP_KEY: process.env.PUSHER_APP_KEY,
      PUSHER_SECRET: process.env.PUSHER_SECRET,
      PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
    });

    // initiallize team hook
    this.teams = new TeamsIncomingWebhook(process.env.MS_TEAMS_WEBHOOK_URL);

    // initiallize pusher
    this.pusher = new Pusher({
      appId: process.env.PUSHER_APP_ID,
      key: process.env.PUSHER_APP_KEY,
      secret: process.env.PUSHER_SECRET,
      cluster: process.env.PUSHER_CLUSTER,
      useTLS: true,
    });
  }

  // sends notification to all services
  async broadcastNotification(message: string) {
    await this.sendTeamsNotification(message);
    await this.sendSlackNotification(message);
    // await this.sendSMS(message);
    await this.sendPusherNotification(message);

    // Send web-based notifications to all subscribers
    await Promise.all(
      this.subscribers.map((subscriber) => {
        console.log('Sending to ', subscriber.subscription);
        this.sendWebPushNotification(subscriber.subscription, message);
      }),
    );
  }

  async sendSlackNotification(message: string) {
    await this.slack.send({
      text: message || 'New Item added',
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
            text: message || 'New Item added',
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

  async sendPusherNotification(message: string) {
    await this.pusher.trigger('books', 'book_data', message);
  }

  async sendWebPushNotification(subscription, message) {
    // Create payload
    const payload = JSON.stringify({ title: message });

    // Pass object into sendNotification
    await webpush
      .sendNotification(subscription, payload)
      .catch((err) => console.error(err));
  }

  async subscribePushNotification(subscription) {
    // Get pushSubscription object
    // console.log({ subscription });
    const username = 'mushtaq'; // calculate userName on the fly
    // add subscriber if the browser has not been subscribed before.
    console.log(subscription.endpoint);
    console.log(this.subscribers);
    if (
      this.subscribers.filter(
        (subscriber) =>
          subscriber.username === username &&
          subscriber.subscription.endpoint !== subscription.endpoint,
      )
    ) {
      this.subscribers.push({
        username,
        subscription,
      });
    }

    console.log(this.subscribers);
    const data = 'New book added';
    await this.sendWebPushNotification(subscription, data);
  }
}
