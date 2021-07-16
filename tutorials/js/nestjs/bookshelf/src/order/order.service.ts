import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
  ) {}

  async create(data: CreateOrderInput) {
    const orderData = this.orderRepository.create(data);
    const order = await this.orderRepository.save(orderData);
    return order;
  }

  async findAll() {
    const orders = await this.orderRepository.find();
    return orders;
  }

  async findOne(id: string) {
    const order = await this.orderRepository.findOne({ id });
    return order;
  }

  async update(data: UpdateOrderInput) {
    const order = await this.orderRepository.findOne({
      where: { id: data.id },
    });
    if (!order) throw new Error('Order not found!');
    Object.assign(order, data);
    await this.orderRepository.save(order);
    return order;
  }

  async remove(id: string) {
    const order = await this.orderRepository.findOne({ id });
    if (!order) throw new Error('Order not found!');
    await this.orderRepository.remove(order);
    return order;
  }
}
