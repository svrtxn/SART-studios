import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../../categories/entities/category.entity';

@Entity()
export class CategoryRule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  keyword: string; // e.g. "UBER"

  @ManyToOne(() => Category)
  category: Category;

  @Column()
  categoryId: number;
}
