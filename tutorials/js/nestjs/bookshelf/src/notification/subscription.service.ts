import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { CreateSubscriptionInput } from './dto/create-script-record.input';
import { Subscription } from './entities/subscription.entity';

@Injectable()
export class SubscriptionService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionRepository: Repository<Subscription>,
  ) {}

  async subscribe(username, subscription) {
    const userEndpointSubscription = await this.find(
      username,
      subscription.endpoint,
    );
    if (!userEndpointSubscription) {
      const subscriptionRecord = Subscription.create({
        username,
        subscription: JSON.stringify(subscription),
      });
      await this.create(subscriptionRecord);
    }
    const subscribers = await this.findAll({});
    console.log(subscribers);
  }

  // subscription entity methods
  async create(data: CreateSubscriptionInput) {
    const subscription = this.subscriptionRepository.create(data);
    await this.subscriptionRepository.save(subscription);
  }

  async findAll(options) {
    const subscriptions = await this.subscriptionRepository.find(options);
    return subscriptions;
  }

  async find(username, endpoint) {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        username,
        subscription: Like(`%${endpoint}%`),
      },
    });
    return subscription;
  }
  // TODO: update & remove entity methods
}
