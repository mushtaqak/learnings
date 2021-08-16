import { Body, Controller, Post } from '@nestjs/common';
import { NotificationService } from './notification.service';

@Controller('notification')
export class NotificationController {
  constructor(private notificationService: NotificationService) {}
  @Post('/subscribe')
  async subscribe(@Body() data) {
    await this.notificationService.subscribePushNotification(data);
  }
}
