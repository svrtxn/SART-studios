import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from '../entities/quiz.entity';
import { Question } from '../entities/question.entity';
import { User } from '../entities/user.entity';
import OpenAI from 'openai';

@Injectable()
export class QuizzesService {
  private openai: OpenAI;

  constructor(
    @InjectRepository(Quiz)
    private quizzesRepository: Repository<Quiz>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || 'dummy_key',
    });
  }

  async generateQuiz(userId: string, title: string, contentSource: string): Promise<Quiz> {
    let generatedQuestions = [];

    if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'dummy_key') {
      console.warn('OPENAI_API_KEY is missing, returning mock questions');
      generatedQuestions = [
        {
          text: '¿Cuál es el tema principal del texto proporcionado?',
          optionA: 'Una introducción al tema principal',
          optionB: 'Un análisis detallado de la transcripción',
          optionC: 'Conceptos clave extraídos del texto',
          optionD: 'Todas las anteriores',
          correctAnswer: 'D',
          explanation: 'El texto abarca de forma general la introducción, el análisis y los conceptos clave, por lo que todas las opciones son correctas.'
        }
      ];
    } else {
      const systemPrompt = `
Eres un profesor experto en evaluación educativa. Tu objetivo es leer el contenido proporcionado por el usuario y generar un cuestionario de opción múltiple con 5 preguntas (ni más, ni menos).

DEBES RESPONDER ÚNICA Y EXCLUSIVAMENTE CON UN ARREGLO JSON. No incluyas backticks, ni formato Markdown, ni saludos. Solo un arreglo JSON estricto.

Estructura obligatoria del JSON para cada pregunta:
[
  {
    "text": "Texto de la pregunta",
    "optionA": "Opción A",
    "optionB": "Opción B",
    "optionC": "Opción C",
    "optionD": "Opción D",
    "correctAnswer": "A", // O B, C, D (una sola letra)
    "explanation": "Breve explicación formativa de por qué es la respuesta correcta"
  }
]
`;

      try {
        const response = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: `Contenido de estudio:\n\n${contentSource}` }
          ],
          temperature: 0.7,
        });

        const jsonString = response.choices[0].message.content.trim();
        generatedQuestions = JSON.parse(jsonString);
      } catch (error) {
        console.error('Error calling OpenAI:', error);
        throw new Error('Fallo al generar cuestionario con IA.');
      }
    }

    // 2. Create and save Quiz entity
    const quiz = this.quizzesRepository.create({
      title: title || 'Nuevo Cuestionario Generado',
      contentSource,
      user: { id: userId } as User,
      questions: generatedQuestions
    });

    return this.quizzesRepository.save(quiz);
  }

  async findAll(userId: string): Promise<Quiz[]> {
    return this.quizzesRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: 'DESC' },
      relations: ['questions'] // We might not want to load questions in the list view for performance, but it's okay for now.
    });
  }

  async findOne(id: string, userId: string): Promise<Quiz> {
    const quiz = await this.quizzesRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['questions']
    });
    
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async submitAnswers(id: string, userId: string, answers: Record<string, string>): Promise<any> {
    const quiz = await this.findOne(id, userId);
    
    let score = 0;
    const results = [];

    quiz.questions.forEach(question => {
      const userAnswer = answers[question.id];
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) score++;

      results.push({
        questionId: question.id,
        isCorrect,
        userAnswer,
        correctAnswer: question.correctAnswer,
        explanation: question.explanation
      });
    });

    return {
      score,
      total: quiz.questions.length,
      percentage: Math.round((score / quiz.questions.length) * 100),
      results
    };
  }
}
