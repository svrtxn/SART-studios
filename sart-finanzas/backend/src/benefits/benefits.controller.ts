import { Controller, Get } from '@nestjs/common';
import { BenefitsService } from './benefits.service';

@Controller('benefits')
export class BenefitsController {
  constructor(private readonly benefitsService: BenefitsService) {}

  @Get()
  findAll() {
    return this.benefitsService.findAll();
  }
}
