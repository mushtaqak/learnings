import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { OrderService } from './order.service';
import { Order } from './entities/order.entity';
import { CreateOrderInput } from './dto/create-order.input';
import { UpdateOrderInput } from './dto/update-order.input';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private readonly orderService: OrderService) {}

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => [Order])
  findAll() {
    return this.orderService.findAll();
  }

  @Query(() => Order)
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderService.findOne(id);
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput);
  }

  @Mutation(() => Order)
  removeOrder(@Args('id', { type: () => String }) id: string) {
    return this.orderService.remove(id);
  }
}
