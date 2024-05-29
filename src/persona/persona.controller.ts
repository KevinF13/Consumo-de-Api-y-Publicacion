import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { AuthGuard } from '@nestjs/passport';
import { Persona } from './entities/persona.entity';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { ApiTags } from '@nestjs/swagger';


@Controller('persona')
@ApiTags('Personas Información')
export class PersonaController {
  constructor(private readonly personaService: PersonaService) {}

  @Post()
  @UseGuards(AuthGuard()) // Utiliza el guardia de autenticación
  async createPersona(
    @Body() createPersonaDto: CreatePersonaDto,
    @Req() req,
  ): Promise<Persona> {
    return this.personaService.create(createPersonaDto, req.user);
  }

  @Get()
  async getAllPersonas(@Query() query: ExpressQuery): Promise<Persona[]> {
    return this.personaService.findAll(query);
  }

  @Get(':id')
  async getPersona(
    @Param('id')
    id: string,
  ): Promise<Persona> {
    return this.personaService.findByUserId(id);
  }

  @Put(':id')
  async updateByUserId(
    @Param('id')
    id: string,
    @Body()
    persona: UpdatePersonaDto,
  ): Promise<Persona> {
    return this.personaService.updateByUserId(id, persona);
  }

  @Delete(':id')
  async deleteByUserId(
    @Param('id')
    id: string,
  ): Promise<Persona> {
    return this.personaService.deleteByUserId(id);
  }
}
