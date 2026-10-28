import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transcription } from '../entities/transcription.entity';
import { User } from '../entities/user.entity';
import { spawn } from 'child_process';
import * as path from 'path';

@Injectable()
export class TranscriptionsService {
  constructor(
    @InjectRepository(Transcription)
    private transcriptionsRepository: Repository<Transcription>,
  ) {}

  async create(userId: string, data: Partial<Transcription>): Promise<Transcription> {
    const transcription = this.transcriptionsRepository.create({
      ...data,
      user: { id: userId } as User,
      status: 'WAITING',
    });
    return this.transcriptionsRepository.save(transcription);
  }

  async processAudio(transcriptionId: string, audioFilePath: string): Promise<void> {
    // Set status to PROCESSING
    await this.transcriptionsRepository.update(transcriptionId, { status: 'PROCESSING' });

    return new Promise((resolve, reject) => {
      const scriptPath = path.join(__dirname, 'python', 'transcribe.py');
      // For development, assuming python/python3 is in PATH
      const pythonProcess = spawn('python', [scriptPath, audioFilePath]);

      let stdoutData = '';
      let stderrData = '';

      pythonProcess.stdout.on('data', (data) => {
        stdoutData += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        stderrData += data.toString();
      });

      pythonProcess.on('close', async (code) => {
        if (code !== 0) {
          console.error(`Transcription process failed with code ${code}`);
          console.error(`stderr: ${stderrData}`);
          await this.transcriptionsRepository.update(transcriptionId, { status: 'ERROR' });
          return reject(new Error('Transcription failed'));
        }

        try {
          // Parse the JSON output from transcribe.py
          const result = JSON.parse(stdoutData);
          if (result.error) {
            throw new Error(result.error);
          }

          // Update DB with successful transcription
          await this.transcriptionsRepository.update(transcriptionId, {
            status: 'COMPLETED',
            transcript: result.text,
            segments: result.segments,
          });

          resolve();
        } catch (error) {
          console.error('Failed to parse Python output:', error);
          await this.transcriptionsRepository.update(transcriptionId, { status: 'ERROR' });
          reject(error);
        }
      });
    });
  }

  async findAllForUser(userId: string): Promise<Transcription[]> {
    return this.transcriptionsRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, userId: string): Promise<Transcription> {
    const transcription = await this.transcriptionsRepository.findOne({
      where: { id, user: { id: userId } },
      relations: { uploads: true },
    });
    if (!transcription) {
      throw new NotFoundException(`Transcription with ID ${id} not found`);
    }
    return transcription;
  }

  async update(id: string, userId: string, data: Partial<Transcription>): Promise<Transcription> {
    const transcription = await this.findOne(id, userId);
    Object.assign(transcription, data);
    return this.transcriptionsRepository.save(transcription);
  }

  async remove(id: string, userId: string): Promise<void> {
    const transcription = await this.findOne(id, userId);
    await this.transcriptionsRepository.remove(transcription);
  }
}
