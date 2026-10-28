import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Settings } from './entities/settings.entity';
import { Transcription } from './entities/transcription.entity';
import { Upload } from './entities/upload.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SettingsModule } from './settings/settings.module';
import { TranscriptionsModule } from './transcriptions/transcriptions.module';
import { UploadsModule } from './uploads/uploads.module';

import { QuizzesModule } from './quizzes/quizzes.module';
import { Quiz } from './entities/quiz.entity';
import { Question } from './entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: 'database.sqlite',
      entities: [User, Settings, Transcription, Upload, Quiz, Question],
      synchronize: true, // Auto create schema for dev
    }),
    AuthModule,
    UsersModule,
    SettingsModule,
    TranscriptionsModule,
    UploadsModule,
    QuizzesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
