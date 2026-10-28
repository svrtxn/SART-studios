import { Controller, Post, Get, Delete, Param, UseInterceptors, UploadedFile, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadsService } from './uploads.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

// @UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req: any, file: any, callback: any) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async uploadFile(@UploadedFile() file: Express.Multer.File, @Body('transcriptionId') transcriptionId: string) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    if (!transcriptionId) {
      throw new BadRequestException('transcriptionId is required');
    }
    return this.uploadsService.create(file, transcriptionId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.uploadsService.findOne(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.uploadsService.remove(id);
  }
}
