import { Module } from '@nestjs/common';
import { SlackModule } from 'nestjs-slack-webhook';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    SlackModule.forRoot({
      url: process.env.SLACK_WEBHOOK_URL,
    }),
  ],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
