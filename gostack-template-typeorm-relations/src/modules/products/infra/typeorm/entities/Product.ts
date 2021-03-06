import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';


import OrdersProducts from './../../../../orders/infra/typeorm/entities/OrdersProducts';

@Entity('products')
class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @OneToMany(() => OrdersProducts, ordersProducts => ordersProducts.product)
    order_products: OrdersProducts[];

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

}

export default Product;
