import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Settings {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: 'auto' })
  defaultLanguage: string;

  @Column({ default: 'TXT' })
  exportFormat: string;

  @Column({ default: 'whisper' })
  apiProvider: string;

  @OneToOne(() => User, (user) => user.settings, { onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;
}
