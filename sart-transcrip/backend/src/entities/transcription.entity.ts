import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Upload } from './upload.entity';

@Entity()
export class Transcription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  filename: string;

  @Column({ nullable: true })
  duration: number;

  @Column({ nullable: true })
  language: string;

  @Column({ default: 'WAITING' })
  status: string;

  @Column({ type: 'text', nullable: true })
  transcript: string;

  @Column({ type: 'simple-json', nullable: true })
  segments: any;

  @Column()
  provider: string;

  @ManyToOne(() => User, (user) => user.transcriptions, { onDelete: 'CASCADE' })
  user: User;

  @OneToMany(() => Upload, (upload) => upload.transcription)
  uploads: Upload[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
