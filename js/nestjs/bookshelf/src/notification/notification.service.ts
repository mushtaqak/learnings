import { In } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';
import { InjectSlack } from 'nestjs-slack-webhook';
import { IncomingWebhook as TeamsIncomingWebhook } from 'ms-teams-webhook';
import { InjectTwilio, TwilioClient } from 'nestjs-twilio';
import { SubscriptionService } from './subscription.service';
import { ALL_PUSH_TYPES, PUSH_TYPES } from './constants';
import { SseService } from './sse.service';
// import Pusher from 'pusher'; // TypeError: pusher_1.default is not a constructor
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Pusher = require('pusher');

// import webpush from 'web-push'; // web_push_1.default.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpush = require('web-push');

@Injectable()
export class NotificationService {
  // subscribers = []; // deprecated in favor of db record
  teams: TeamsIncomingWebhook;
  pusher;

  constructor(
    @InjectSlack()
    private readonly slack: IncomingWebhook,
    @InjectTwilio()
    private readonly twilio: TwilioClient,
    private subscriptionService: SubscriptionService,
    private readonly sseService: SseService,
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
      VAPID_PUBLIC_KEY: process.env.VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY: process.env.VAPID_PRIVATE_KEY,
      VAPID_EMAIL: process.env.VAPID_EMAIL,
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

    // initialize webpush
    webpush.setVapidDetails(
      process.env.VAPID_EMAIL,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  // sends notification to push services
  async broadcastNotification(
    message: string,
    notificatyonTypes = ALL_PUSH_TYPES,
    users?: string[],
  ) {
    if (notificatyonTypes.includes(PUSH_TYPES.SLACK_PUSH_TYPE)) {
      await this.sendSlackNotification(message);
    }
    if (notificatyonTypes.includes(PUSH_TYPES.TEAMS_PUSH_TYPE)) {
      await this.sendTeamsNotification(message);
    }
    if (notificatyonTypes.includes(PUSH_TYPES.SMS_PUSH_TYPE)) {
      await this.sendSMS(message);
    }
    if (notificatyonTypes.includes(PUSH_TYPES.PUSHER_PUSH_TYPE)) {
      await this.sendPusherNotification(message);
    }
    if (notificatyonTypes.includes(PUSH_TYPES.WEB_PUSH_TYPE)) {
      // Send web-based notifications to subscribers list
      // const subscribers = this.subscribers; // deprecated in favour of db record
      this.sendWebPushNotifications(message, users);
    }
    if (notificatyonTypes.includes(PUSH_TYPES.SSE_PUSH_TYPE)) {
      this.sseService.addEvent({ data: { message } });
    }
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

  // web push multi device notifications
  async sendWebPushNotifications(message, users) {
    const options =
      users && users.length > 0
        ? {
            where: {
              username: In(users),
            },
          }
        : {};
    const subscribers = await this.subscriptionService.findAll(options);
    await Promise.all(
      subscribers.map((subscriber) => {
        const subscription = JSON.parse(subscriber.subscription);
        console.log('Sending to ', subscription);
        this.sendWebPushNotification(subscription, message);
      }),
    );
  }

  // web push single push
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
    // add user subscription if user browser endpoint has not been subscribed before.
    /* deprecated in favour of db record */
    /*
    const userEndpointSubscriptions = this.subscribers.filter(
      (subscriber) =>
        subscriber.username === username &&
        subscriber.subscription.endpoint === subscription.endpoint,
    );
    if (userEndpointSubscriptions.length === 0) {
      // this could have been a data insertion in database as well.
      this.subscribers.push({
        username,
        subscription,
      });
    }
    */
    await this.subscriptionService.subscribe(username, subscription);
    const data = 'Subscription completed';
    await this.sendWebPushNotification(subscription, data);
  }
}
