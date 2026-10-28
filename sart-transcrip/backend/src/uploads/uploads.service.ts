import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Upload } from '../entities/upload.entity';
import { Transcription } from '../entities/transcription.entity';
import { TranscriptionsService } from '../transcriptions/transcriptions.service';

@Injectable()
export class UploadsService {
  constructor(
    @InjectRepository(Upload)
    private uploadsRepository: Repository<Upload>,
    private transcriptionsService: TranscriptionsService,
  ) {}

  async create(file: Express.Multer.File, transcriptionId: string): Promise<Upload> {
    const upload = this.uploadsRepository.create({
      originalFilename: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      path: file.path, // This assumes local storage for now
      transcription: { id: transcriptionId } as Transcription,
    });
    
    const savedUpload = await this.uploadsRepository.save(upload);
    
    // Trigger the background transcription process
    this.transcriptionsService.processAudio(transcriptionId, file.path).catch(err => {
      console.error('Failed to trigger transcription processing', err);
    });

    return savedUpload;
  }

  async findOne(id: string): Promise<Upload> {
    const upload = await this.uploadsRepository.findOne({ where: { id } });
    if (!upload) {
      throw new NotFoundException(`Upload with ID ${id} not found`);
    }
    return upload;
  }

  async remove(id: string): Promise<void> {
    const upload = await this.findOne(id);
    // Note: You would also want to delete the actual file from the file system here
    await this.uploadsRepository.remove(upload);
  }
}
