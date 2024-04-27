import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    category: string;

    @Column('decimal')
    price: number;

    constructor(name: string, category: string, price: number, id: number) {
        this.name = name;
        this.category = category;
        this.price = price;
        this.id = id;
    }
}