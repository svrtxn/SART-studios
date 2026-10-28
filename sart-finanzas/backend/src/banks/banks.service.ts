import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BanksService {
  constructor(
    @InjectRepository(Bank)
    private banksRepository: Repository<Bank>,
  ) {}

  findAll() {
    return this.banksRepository.find();
  }

  findOne(id: number) {
    return this.banksRepository.findOne({ where: { id } });
  }

  create(bankData: Partial<Bank>) {
    const bank = this.banksRepository.create(bankData);
    return this.banksRepository.save(bank);
  }

  async remove(id: number) {
    await this.banksRepository.delete(id);
    return { success: true };
  }
}
