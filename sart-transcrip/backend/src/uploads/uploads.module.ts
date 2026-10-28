import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { Upload } from '../entities/upload.entity';
import { TranscriptionsModule } from '../transcriptions/transcriptions.module';

@Module({
  imports: [TypeOrmModule.forFeature([Upload]), TranscriptionsModule],
  controllers: [UploadsController],
  providers: [UploadsService],
  exports: [UploadsService],
})
export class UploadsModule {}
