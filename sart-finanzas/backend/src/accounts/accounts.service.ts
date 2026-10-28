import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private accountsRepository: Repository<Account>,
  ) {}

  async findAll(): Promise<Account[]> {
    return this.accountsRepository.find({ relations: { bank: true } });
  }

  async findOne(id: string): Promise<Account> {
    const account = await this.accountsRepository.findOne({ where: { id }, relations: { bank: true } });
    if (!account) {
      throw new NotFoundException(`Account #${id} not found`);
    }
    return account;
  }

  async create(data: Partial<Account>): Promise<Account> {
    // Current balance starts as initial balance
    const newAccount = this.accountsRepository.create({
        ...data,
        currentBalance: data.initialBalance || 0
    });
    return this.accountsRepository.save(newAccount);
  }

  async update(id: string, data: Partial<Account>): Promise<Account> {
    const account = await this.findOne(id);
    Object.assign(account, data);
    return this.accountsRepository.save(account);
  }

  async remove(id: string): Promise<void> {
    const account = await this.findOne(id);
    // Soft remove since we have a deletedAt column
    await this.accountsRepository.softRemove(account);
  }
}
