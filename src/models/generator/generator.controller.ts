import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GeneratorService } from './generator.service';

@Controller('generator')
export class GeneratorController {
  constructor(private readonly generatorService: GeneratorService) {}

  @Get()
  generate() {
    return this.generatorService.generate();
  }
}
