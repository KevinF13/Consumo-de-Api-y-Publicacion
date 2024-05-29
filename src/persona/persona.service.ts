import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Persona } from './entities/persona.entity';
import mongoose from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class PersonaService {

  constructor(
    @InjectModel(Persona.name)
    private personaModel: mongoose.Model<Persona>,
  ) {}

  
  async create(persona: Persona, user: User): Promise<Persona> {
    if (!user) {
      throw new Error('Usuario no autenticado. Debes iniciar sesión para realizar esta acción.');
    }

    // Verifica que el usuario tenga el rol de "Supervisor"
    if (user.role !== 'Supervisor') {
      throw new ConflictException('No tienes permisos para realizar esta acción. Debes ser Supervisor.');
    }

    // Asigna el ID del usuario explícitamente a la nueva persona
    const data = Object.assign(persona);

    // Crea la nueva persona en la base de datos
    const res = await this.personaModel.create(data);
    return res;
  }


  async findAll(query: Query): Promise<Persona[]> {
    const resPerPage = 5;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const persona = await this.personaModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return persona;
  }

  async findByUserId(id: string): Promise<Persona> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }

    const persona = await this.personaModel.findOne({userId: id});

    if (!persona) {
      throw new NotFoundException('No se encontró la persona');
    }

    return persona;
  }

  async updateByUserId(userId: string, personaData: Partial<Persona>): Promise<Persona> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }
    const persona = await this.personaModel.findOneAndUpdate({ userId }, personaData, {
      new: true,
      runValidators: true,
    });

    if (!persona) {
      throw new NotFoundException('No se encontró la persona');
    }

    return persona;
  }

  async deleteByUserId(userId: string): Promise<Persona> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }
    const persona = await this.personaModel.findOneAndDelete({ userId });

    if (!persona) {
      throw new NotFoundException('No se encontró la persona');
    }

    return persona;
  }
}
