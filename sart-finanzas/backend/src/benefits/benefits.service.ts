import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Benefit } from './entities/benefit.entity';

@Injectable()
export class BenefitsService implements OnModuleInit {
  private readonly logger = new Logger(BenefitsService.name);

  constructor(
    @InjectRepository(Benefit)
    private readonly benefitsRepository: Repository<Benefit>,
  ) {}

  async onModuleInit() {
    await this.seedBenefits();
  }

  findAll() {
    return this.benefitsRepository.find();
  }

  private async seedBenefits() {
    const count = await this.benefitsRepository.count();
    if (count > 0) {
      this.logger.log('Benefits already seeded.');
      return;
    }

    this.logger.log('Seeding benefits...');

    const sampleBenefits = [
      // Banco Falabella
      {
        bank: 'Banco Falabella',
        title: '40% Dcto en Restaurantes seleccionados',
        description: 'Pagando con tu CMR Falabella o Débito Banco Falabella.',
        category: 'Restaurantes',
        dayOfWeek: 'Lunes',
        imageUrl: 'https://icon.horse/icon/bancofalabella.cl',
        sourceUrl: 'https://www.bancofalabella.cl/descuentos'
      },
      {
        bank: 'Banco Falabella',
        title: '30% Dcto en Vestuario Falabella',
        description: 'Descuento exclusivo en tiendas Falabella.',
        category: 'Vestuario',
        dayOfWeek: 'Martes',
        imageUrl: 'https://icon.horse/icon/bancofalabella.cl',
        sourceUrl: 'https://www.bancofalabella.cl/descuentos'
      },
      {
        bank: 'Banco Falabella',
        title: 'Hasta 40% Dcto en Perfumería',
        description: 'En tiendas Tottus y Falabella.com.',
        category: 'Belleza',
        dayOfWeek: 'Miércoles',
        imageUrl: 'https://icon.horse/icon/bancofalabella.cl',
        sourceUrl: 'https://www.bancofalabella.cl/descuentos'
      },
      {
        bank: 'Banco Falabella',
        title: '20% Dcto en Bencina Petrobras',
        description: 'Descuento pagando en la App Petrobras con tu tarjeta.',
        category: 'Transporte',
        dayOfWeek: 'Jueves',
        imageUrl: 'https://icon.horse/icon/bancofalabella.cl',
        sourceUrl: 'https://www.bancofalabella.cl/descuentos'
      },
      {
        bank: 'Banco Falabella',
        title: '50% Dcto en Cines',
        description: 'En Cinemark, pagando con CMR.',
        category: 'Entretención',
        dayOfWeek: 'Viernes',
        imageUrl: 'https://icon.horse/icon/bancofalabella.cl',
        sourceUrl: 'https://www.bancofalabella.cl/descuentos'
      },

      // Banco Ripley
      {
        bank: 'Banco Ripley',
        title: 'Descuento en Farmacias Ahumada',
        description: 'Hasta 30% de descuento en medicamentos.',
        category: 'Salud',
        dayOfWeek: 'Lunes',
        imageUrl: 'https://icon.horse/icon/bancoripley.cl',
        sourceUrl: 'https://www.bancoripley.cl/beneficios-y-promociones'
      },
      {
        bank: 'Banco Ripley',
        title: '30% Dcto en Papa Johns',
        description: 'Pidiendo a domicilio con Tarjeta Ripley.',
        category: 'Restaurantes',
        dayOfWeek: 'Martes',
        imageUrl: 'https://icon.horse/icon/bancoripley.cl',
        sourceUrl: 'https://www.bancoripley.cl/beneficios-y-promociones'
      },
      {
        bank: 'Banco Ripley',
        title: '20% Dcto en Supermercados Unimarc',
        description: 'Válido pagando con Tarjeta Ripley presencial.',
        category: 'Supermercados',
        dayOfWeek: 'Jueves',
        imageUrl: 'https://icon.horse/icon/bancoripley.cl',
        sourceUrl: 'https://www.bancoripley.cl/beneficios-y-promociones'
      },
      {
        bank: 'Banco Ripley',
        title: 'Envío Gratis en Ripley.com',
        description: 'En compras sobre $15.000 con tu tarjeta.',
        category: 'Retail',
        dayOfWeek: 'Todos los días',
        imageUrl: 'https://icon.horse/icon/bancoripley.cl',
        sourceUrl: 'https://www.bancoripley.cl/beneficios-y-promociones'
      },

      // Banco de Chile
      {
        bank: 'Banco de Chile',
        title: '30% Dcto en Starbucks',
        description: 'Para todas tus bebidas pagando con tu Tarjeta del Chile.',
        category: 'Cafetería',
        dayOfWeek: 'Lunes',
        imageUrl: 'banks/bancochile.svg',
        sourceUrl: 'https://sitiospublicos.bancochile.cl/personas/beneficios/todos-los-beneficios'
      },
      {
        bank: 'Banco de Chile',
        title: '25% Dcto en Jumbo',
        description: 'Exclusivo en Jumbo.cl los días Miércoles.',
        category: 'Supermercados',
        dayOfWeek: 'Miércoles',
        imageUrl: 'banks/bancochile.svg',
        sourceUrl: 'https://sitiospublicos.bancochile.cl/personas/beneficios/todos-los-beneficios'
      },
      {
        bank: 'Banco de Chile',
        title: '30% Dcto en Cornershop',
        description: 'Comprando desde la app y pagando con tus tarjetas de crédito.',
        category: 'Supermercados',
        dayOfWeek: 'Sábado',
        imageUrl: 'banks/bancochile.svg',
        sourceUrl: 'https://sitiospublicos.bancochile.cl/personas/beneficios/todos-los-beneficios'
      },
      {
        bank: 'Banco de Chile',
        title: 'Canje de Puntos Dolares-Premio',
        description: 'Viajes Falabella - Paga con tus Dólares-Premio.',
        category: 'Viajes',
        dayOfWeek: 'Todos los días',
        imageUrl: 'banks/bancochile.svg',
        sourceUrl: 'https://sitiospublicos.bancochile.cl/personas/beneficios/todos-los-beneficios'
      },
      
      // Banco Santander (keeping the existing one)
      {
        bank: 'Santander',
        title: '40% Dcto Sabores',
        description: 'En restaurantes seleccionados.',
        category: 'Restaurantes',
        dayOfWeek: 'Miércoles',
        imageUrl: 'banks/santander.svg',
        sourceUrl: 'https://banco.santander.cl/beneficios'
      }
    ];

    for (const b of sampleBenefits) {
      const benefit = this.benefitsRepository.create(b);
      await this.benefitsRepository.save(benefit);
    }
    
    this.logger.log('Benefits seeded successfully.');
  }
}
