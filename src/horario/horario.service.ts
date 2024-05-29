import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { Horario } from './schemas/horario.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class HorarioService {

  constructor(
    @InjectModel(Horario.name)
    private horarioModel: Model<Horario>,

  ) {}

  async create(horario: Horario, user: User): Promise<Horario> {
    if (!user) {
      throw new Error('Usuario no autenticado. Debes iniciar sesión para realizar esta acción.');
    }
  
    // Verifica que el usuario tenga el rol de "Supervisor"
    if (user.role !== 'Supervisor') {
      throw new ConflictException('No tienes permisos para realizar esta acción. Debes ser Supervisor.');
    }
  
    // Validar userId
    if (!mongoose.Types.ObjectId.isValid(horario.userId)) {
      throw new ConflictException('El userId proporcionado no es válido.');
    }
  
    // Asigna el ID del usuario explícitamente a la nueva persona
    const data = { ...horario }; // Copia el objeto horario
  
    // Crea la nueva persona en la base de datos
    const res = await this.horarioModel.create(data);
    return res;
  }


  async findAll(query: Query): Promise<Horario[]> {
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

    const horario = await this.horarioModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return horario;
  }

  async findByUserId(id: string): Promise<Horario> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }

    const horario = await this.horarioModel.findById( id);

    if (!horario) {
      throw new NotFoundException('No se encontró la persona');
    }

    return horario;
  }

  async updateByUserId(userId: string, horarioData: Partial<Horario>): Promise<Horario> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }
    const horario = await this.horarioModel.findByIdAndUpdate(userId , horarioData, {
      new: true,
      runValidators: true,
    });

    if (!horario) {
      throw new NotFoundException('No se encontró la persona');
    }

    return horario;
  }

  async deleteByUserId(userId: string): Promise<Horario> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }
    const horario = await this.horarioModel.findByIdAndDelete( userId );

    if (!horario) {
      throw new NotFoundException('No se encontró la persona');
    }

    return horario;
  }
}
