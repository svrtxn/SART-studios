import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { Bank } from '../../banks/entities/bank.entity';
import { Transaction } from '../../transactions/entities/transaction.entity';

@Entity()
export class Account {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  bankName: string; // The official bank name for logos/colors

  @Column({ default: 'ASSET' }) // ASSET (Cuenta Corriente/Ahorro) or LIABILITY (Tarjeta de Credito)
  nature: 'ASSET' | 'LIABILITY';

  @Column({ default: 'CHECKING' })
  type: string; // 'CHECKING' | 'CREDIT' | 'SAVINGS'

  @Column({ nullable: true })
  accountNumber: string;

  @Column({ nullable: true })
  ownerName: string;

  @Column({ nullable: true })
  ownerRut: string;

  @Column({ nullable: true })
  ownerEmail: string;

  @Column({ nullable: true })
  cardNumber: string;

  @Column({ nullable: true })
  cardExpiration: string;

  @Column({ nullable: true })
  cvv: string;

  @Column({ default: 'CLP' })
  currencyCode: string;

  @Column('integer', { default: 0 })
  initialBalance: number; // Stored in cents

  @Column('integer', { default: 0 })
  currentBalance: number; // Cache field, updated via triggers/hooks

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  color: string;

  @ManyToOne(() => Bank, { nullable: true })
  bank: Bank;

  @OneToMany(() => Transaction, transaction => transaction.account)
  transactions: Transaction[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
