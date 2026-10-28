import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BanksService } from './banks.service';
import { Bank } from './entities/bank.entity';

@Controller('banks')
export class BanksController {
  constructor(private readonly banksService: BanksService) {}

  @Get()
  findAll() {
    return this.banksService.findAll();
  }

  @Post()
  create(@Body() bankData: Partial<Bank>) {
    return this.banksService.create(bankData);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.banksService.remove(+id);
  }
}
