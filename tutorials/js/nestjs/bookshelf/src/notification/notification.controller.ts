import { Body, Controller, Post, Sse } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { SseService } from './sse.service';

@Controller('notification')
export class NotificationController {
  constructor(
    private notificationService: NotificationService,
    private readonly sseService: SseService,
  ) {}

  @Post('/subscribe')
  async subscribe(@Body() data) {
    await this.notificationService.subscribePushNotification(data);
  }

  @Sse('sse')
  sse() {
    // return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
    return this.sseService.sendEvents();
  }
}
