import { Controller, Post, UseInterceptors, UploadedFile, BadRequestException, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from '../accounts/entities/account.entity';

@Controller('upload')
export class UploadController {
  constructor(
    private readonly uploadService: UploadService,
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>,
  ) {}

  @Post('cartola')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCartola(
    @UploadedFile() file: Express.Multer.File,
    @Body('bankId') bankId: string,
    @Body('accountId') accountId: string,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    if (!bankId) {
      throw new BadRequestException('Bank ID is required');
    }

    // Look up ownerRut from the account if accountId is provided
    let ownerRut: string | undefined;
    if (accountId) {
      const account = await this.accountRepository.findOne({ where: { id: accountId } });
      if (account?.ownerRut) {
        ownerRut = account.ownerRut;
      }
    }
    
    // Process the file buffer via the service
    const results = await this.uploadService.processCartola(file, parseInt(bankId, 10), ownerRut);
    return {
      message: 'Cartola procesada exitosamente',
      processedRows: results.length,
      data: results
    };
  }
}
