import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Benefit {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bank: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  category: string;

  @Column()
  dayOfWeek: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  sourceUrl: string;
}
