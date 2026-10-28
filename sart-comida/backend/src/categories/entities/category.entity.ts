import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FoodItem } from '../../food-items/entities/food-item.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  icon: string;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.category)
  foodItems: FoodItem[];
}
