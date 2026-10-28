import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { FoodItem } from '../../food-items/entities/food-item.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password_hash: string;

  @Column('simple-json', { nullable: true })
  preferences: Record<string, any>;

  @OneToMany(() => FoodItem, (foodItem) => foodItem.user)
  foodItems: FoodItem[];
}
