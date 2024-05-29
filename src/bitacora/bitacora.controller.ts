import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Query, Put } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { UpdateBitacoraDto } from './dto/update-bitacora.dto';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Bitacora } from './entities/bitacora.entity';
import { Query as ExpressQuery } from 'express-serve-static-core';


@Controller('bitacora')
@ApiTags('Bitacoras')
export class BitacoraController {
  constructor(private readonly bitacoraService: BitacoraService) {}

  @Post()
  @UseGuards(AuthGuard()) // Utiliza el guardia de autenticación
  async createPersona(
    @Body() createBitacoraDto: CreateBitacoraDto,
    @Req() req,
  ): Promise<Bitacora> {
    return this.bitacoraService.create(createBitacoraDto, req.user);
  }

  @Get()
  async getAllPersonas(@Query() query: ExpressQuery): Promise<Bitacora[]> {
    return this.bitacoraService.findAll(query);
  }

  @Get(':id')
  async getHorario(
    @Param('id')
    id: string,
  ): Promise<Bitacora> {
    return this.bitacoraService.findByUserId(id);
  }

  @Put(':id')
  async updateByUserId(
    @Param('id')
    id: string,
    @Body()
    bitacora: UpdateBitacoraDto,
  ): Promise<Bitacora> {
    return this.bitacoraService.updateByUserId(id, bitacora);
  }

  @Delete(':id')
  async deleteByUserId(
    @Param('id')
    id: string,
  ): Promise<Bitacora> {
    return this.bitacoraService.deleteByUserId(id);
  }
}
