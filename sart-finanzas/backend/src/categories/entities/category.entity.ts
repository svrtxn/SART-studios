import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, DeleteDateColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  icon: string;

  @ManyToOne(() => Category, category => category.subcategories, { nullable: true })
  parentCategory: Category;

  @OneToMany(() => Category, category => category.parentCategory)
  subcategories: Category[];

  @DeleteDateColumn()
  deletedAt: Date;
}
