import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FixedTransactionsController } from './fixed-transactions.controller';
import { FixedTransactionsService } from './fixed-transactions.service';
import { FixedTransaction } from './entities/fixed-transaction.entity';
import { RecurringPayment } from './entities/recurring-payment.entity';
import { Transaction } from '../transactions/entities/transaction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FixedTransaction, RecurringPayment, Transaction])],
  controllers: [FixedTransactionsController],
  providers: [FixedTransactionsService],
  exports: [FixedTransactionsService]
})
export class FixedTransactionsModule {}
