import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private repo: Repository<Notification>,
  ) {}

  findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' }, take: 50 });
  }

  findUnread() {
    return this.repo.find({ where: { isRead: false }, order: { createdAt: 'DESC' } });
  }

  getUnreadCount() {
    return this.repo.count({ where: { isRead: false } });
  }

  create(data: Partial<Notification>) {
    const entity = this.repo.create(data);
    return this.repo.save(entity);
  }

  async markAsRead(id: number) {
    await this.repo.update(id, { isRead: true });
    return this.repo.findOne({ where: { id } });
  }

  async markAllAsRead() {
    await this.repo.update({ isRead: false }, { isRead: true });
    return { success: true };
  }

  async remove(id: number) {
    await this.repo.delete(id);
    return { success: true };
  }
}
