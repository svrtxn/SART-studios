import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Settings } from '../entities/settings.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Settings)
    private settingsRepository: Repository<Settings>,
  ) {}

  async getSettingsForUser(userId: string): Promise<Settings> {
    let settings = await this.settingsRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!settings) {
      settings = this.settingsRepository.create({
        user: { id: userId } as User,
      });
      await this.settingsRepository.save(settings);
    }
    return settings;
  }

  async updateSettings(userId: string, updateData: Partial<Settings>): Promise<Settings> {
    const settings = await this.getSettingsForUser(userId);
    Object.assign(settings, updateData);
    return this.settingsRepository.save(settings);
  }
}
