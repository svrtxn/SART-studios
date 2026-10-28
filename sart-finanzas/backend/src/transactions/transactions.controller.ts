import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get()
  findAll() {
    return this.transactionsService.findAll();
  }

  @Post()
  create(@Body() data: Partial<Transaction>) {
    // Basic hash generation if not provided (simplified)
    if (!data.hash) {
      data.hash = `${data.date}-${data.description}-${data.amount}-${Math.random()}`;
    }
    return this.transactionsService.create(data);
  }

  @Post('bulk')
  createBulk(@Body() data: Partial<Transaction>[]) {
    return this.transactionsService.createBulk(data);
  }

  @Get('summary')
  getSummary() {
    return this.transactionsService.getSummary();
  }

  @Post('transfer')
  createTransfer(@Body() data: { fromAccountId: string; toAccountId: string; amount: number; date: Date; description: string }) {
    return this.transactionsService.createTransfer(data.fromAccountId, data.toAccountId, data.amount, data.date, data.description);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transactionsService.remove(+id);
  }
}
