import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards, Request } from '@nestjs/common';
import { TranscriptionsService } from './transcriptions.service';

// @UseGuards(JwtAuthGuard)
@Controller('transcriptions')
export class TranscriptionsController {
  constructor(private readonly transcriptionsService: TranscriptionsService) {}

  @Post()
  async create(@Request() req: any, @Body() body: any) {
    const userId = req.user?.id || req.body?.userId;
    return this.transcriptionsService.create(userId, body);
  }

  @Get()
  async findAll(@Request() req: any) {
    const userId = req.user?.id || req.body?.userId || req.query?.userId;
    return this.transcriptionsService.findAllForUser(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || req.body?.userId || req.query?.userId;
    return this.transcriptionsService.findOne(id, userId);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Request() req: any, @Body() body: any) {
    const userId = req.user?.id || req.body?.userId;
    return this.transcriptionsService.update(id, userId, body);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || req.body?.userId;
    return this.transcriptionsService.remove(id, userId);
  }
}
