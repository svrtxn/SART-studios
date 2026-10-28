import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('food_items')
export class FoodItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.foodItems)
  user: User;

  @ManyToOne(() => Category, (category) => category.foodItems)
  category: Category;

  @Column()
  name: string;

  @Column('decimal', { default: 0 })
  quantity: number;

  @Column()
  unit: string;

  @Column({ type: 'date', nullable: true })
  purchaseDate: Date;

  @Column({ type: 'date', nullable: true })
  expirationDate: Date;

  @Column({ nullable: true })
  location: string;

  @Column({ type: 'text', nullable: true })
  notes: string;
}
