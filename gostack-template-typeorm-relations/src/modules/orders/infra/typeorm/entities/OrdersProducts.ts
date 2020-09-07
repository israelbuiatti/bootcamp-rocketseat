import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';


import Order from './Order';
import Product from './../../../../products/infra/typeorm/entities/Product';


@Entity('orders_products')
class OrdersProducts {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Order)
    @JoinColumn({name: 'order_id'})
    order: Order;

    @ManyToOne(() => Product)
    @JoinColumn({name: 'product_id'})
    product: Product;

    @Column()
    product_id: string;

    @Column()
    order_id: string;

    @Column('decimal')
    price: number;

    @Column('int')
    quantity: number;

    @UpdateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

}

export default OrdersProducts;
