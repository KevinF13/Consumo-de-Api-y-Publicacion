import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
  Put,
} from '@nestjs/common';
import { HorarioService } from './horario.service';
import { CreateHorarioDto } from './dto/create-horario.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Horario } from './schemas/horario.schema';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { UpdateHorarioDto } from './dto/update-horario.dto';

@Controller('horario')
@ApiTags('Horarios')
export class HorarioController {
  constructor(private readonly horarioService: HorarioService) {}
  @Post()
  @UseGuards(AuthGuard()) // Utiliza el guardia de autenticación
  async createPersona(
    @Body() createHorarioDto: CreateHorarioDto,
    @Req() req,
  ): Promise<Horario> {
    return this.horarioService.create(createHorarioDto, req.user);
  }

  @Get()
  async getAllPersonas(@Query() query: ExpressQuery): Promise<Horario[]> {
    return this.horarioService.findAll(query);
  }

  @Get(':id')
  async getHorario(
    @Param('id')
    id: string,
  ): Promise<Horario> {
    return this.horarioService.findByUserId(id);
  }

  @Put(':id')
  async updateByUserId(
    @Param('id')
    id: string,
    @Body()
    horario: UpdateHorarioDto,
  ): Promise<Horario> {
    return this.horarioService.updateByUserId(id, horario);
  }

  @Delete(':id')
  async deleteByUserId(
    @Param('id')
    id: string,
  ): Promise<Horario> {
    return this.horarioService.deleteByUserId(id);
  }
}
