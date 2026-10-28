import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  color: string;

  @Column({ nullable: true })
  abbr: string;

  @Column({ nullable: true })
  logo: string;
}
