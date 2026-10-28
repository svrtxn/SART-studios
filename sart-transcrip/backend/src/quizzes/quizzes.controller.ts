import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post('generate')
  async generate(@Request() req: any, @Body() body: { title: string, contentSource: string }) {
    const userId = req.user?.id || req.body?.userId || 'test-user-id'; // Fallback for dev
    return this.quizzesService.generateQuiz(userId, body.title, body.contentSource);
  }

  @Get()
  async findAll(@Request() req: any) {
    const userId = req.user?.id || req.query?.userId || 'test-user-id';
    return this.quizzesService.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const userId = req.user?.id || req.query?.userId || 'test-user-id';
    return this.quizzesService.findOne(id, userId);
  }

  @Post(':id/submit')
  async submitAnswers(
    @Param('id') id: string,
    @Request() req: any,
    @Body() body: { answers: Record<string, string> }
  ) {
    const userId = req.user?.id || req.body?.userId || 'test-user-id';
    return this.quizzesService.submitAnswers(id, userId, body.answers);
  }
}
