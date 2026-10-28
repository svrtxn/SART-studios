import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { FixedTransactionsService } from './fixed-transactions.service';
import { FixedTransaction } from './entities/fixed-transaction.entity';

@Controller('fixed-transactions')
export class FixedTransactionsController {
  constructor(private readonly service: FixedTransactionsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('upcoming')
  getUpcoming(@Query('days') days?: string) {
    return this.service.getUpcoming(days ? +days : 30);
  }

  @Get('status')
  getWithStatus() {
    return this.service.getWithStatus();
  }

  @Get('commitments')
  getMonthlyCommitments() {
    return this.service.getMonthlyCommitments();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Post()
  create(@Body() data: Partial<FixedTransaction>) {
    return this.service.create(data);
  }

  @Post(':id/pay')
  markAsPaid(@Param('id') id: string, @Body() body: { paidAmount?: number }) {
    return this.service.markAsPaid(+id, body.paidAmount);
  }

  @Post(':id/skip')
  skipPayment(@Param('id') id: string) {
    return this.service.skipPayment(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<FixedTransaction>) {
    return this.service.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
