import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ImportBatch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fileName: string;

  @Column({ default: 'PENDING' })
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED';

  @Column()
  accountId: string;

  @Column('simple-json')
  extractedTransactions: string; // Will store the JSON array of draft transactions before confirmation

  @CreateDateColumn()
  createdAt: Date;
}
