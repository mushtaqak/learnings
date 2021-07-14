import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // declarative cron
  /*
    cron pattern string:
    * * * * * *
    | | | | | |
    | | | | | day of week
    | | | | month
    | | | day of month
    | | hour
    | minute
    second (optional)
  */
  //  @Cron('30 * * * * *') // called every minute at 30th seconds
  @Cron(CronExpression.EVERY_30_SECONDS)
  handleCron() {
    this.logger.debug('[declarative cron] Called when the current second is 30');
  }

  // declarative interval
  @Interval(10000)
  handleInterval() {
    this.logger.debug('[declarative interval] Called every 10 seconds');
  }

  // declarative timeout:
  @Timeout(5000)
  handleTimeout() {
    this.logger.debug('[declarative timeout] Called once after 5 seconds');
  }
}
