import { Controller, Get, Post, Body, Param, Delete, Patch } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { Notification } from './entities/notification.entity';

@Controller('api/notifications')
export class NotificationsController {
  constructor(private readonly service: NotificationsService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get('unread')
  findUnread() {
    return this.service.findUnread();
  }

  @Get('count')
  getUnreadCount() {
    return this.service.getUnreadCount();
  }

  @Post()
  create(@Body() data: Partial<Notification>) {
    return this.service.create(data);
  }

  @Patch(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.service.markAsRead(+id);
  }

  @Post('read-all')
  markAllAsRead() {
    return this.service.markAllAsRead();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
