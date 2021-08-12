import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SlackModule } from 'nestjs-slack-webhook';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    SlackModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        url: configService.get<string>('SLACK_WEBHOOK_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
