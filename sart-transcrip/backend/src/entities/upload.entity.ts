import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Transcription } from './transcription.entity';

@Entity()
export class Upload {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  originalFilename: string;

  @Column()
  size: number;

  @Column()
  mimeType: string;

  @Column()
  path: string;

  @ManyToOne(() => Transcription, (transcription) => transcription.uploads, { onDelete: 'CASCADE' })
  transcription: Transcription;

  @CreateDateColumn()
  uploadedAt: Date;
}
