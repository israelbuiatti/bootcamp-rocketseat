import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
  ManyToOne,
  ManyToMany,
} from 'typeorm';

import Customer from './../../../../customers/infra/typeorm/entities/Customer';
import OrdersProducts from './OrdersProducts';


@Entity('orders')
class Order {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    costumer_id: string;

    @ManyToOne(() => Customer, { eager: true })
    @JoinColumn({name: 'costumer_id'})
    customer: Customer;

    @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.order, {
        eager: true,
        cascade: true,
    })
    order_products: OrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;
}

export default Order;
