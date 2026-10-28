import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { SettingsService } from './settings.service';

// If you have a JwtAuthGuard, you should add it here to protect these endpoints
// @UseGuards(JwtAuthGuard)
@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings(@Request() req: any) {
    // Mock user id since auth is not fully hooked up in this controller yet
    // In a real scenario, use req.user.id
    const userId = req.user?.id || req.body?.userId;
    if (!userId) {
      return { message: 'User ID is required' };
    }
    return this.settingsService.getSettingsForUser(userId);
  }

  @Put()
  async updateSettings(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || req.body?.userId;
    if (!userId) {
      return { message: 'User ID is required' };
    }
    return this.settingsService.updateSettings(userId, body);
  }
}
