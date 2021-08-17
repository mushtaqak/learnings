import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SlackModule } from 'nestjs-slack-webhook';
import { TwilioModule } from 'nestjs-twilio';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionService } from './subscription.service';
import { Subscription } from './entities/subscription.entity';

@Module({
  imports: [
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get<string>('SLACK_WEBHOOK_URL'),
      }),
      inject: [ConfigService],
    }),
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        accountSid: configService.get('TWILIO_ACCOUNT_SID'),
        authToken: configService.get('TWILIO_AUTH_TOKEN'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Subscription]),
  ],
  controllers: [NotificationController],
  providers: [NotificationService, SubscriptionService],
  exports: [NotificationService, SubscriptionService],
})
export class NotificationModule {}
