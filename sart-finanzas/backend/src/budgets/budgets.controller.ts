import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { Budget } from './entities/budget.entity';

@Controller('api/budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Get('summary')
  getSummary() {
    return this.budgetsService.getSummary();
  }

  @Post()
  create(@Body() data: Partial<Budget>) {
    return this.budgetsService.create(data);
  }

  @Get()
  findAll() {
    return this.budgetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() data: Partial<Budget>) {
    return this.budgetsService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(id);
  }
}
