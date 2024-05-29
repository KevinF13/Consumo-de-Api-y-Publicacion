import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBitacoraDto } from './dto/create-bitacora.dto';
import { UpdateBitacoraDto } from './dto/update-bitacora.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Bitacora } from './entities/bitacora.entity';
import mongoose, { Model} from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BitacoraService {

  constructor(
    @InjectModel(Bitacora.name)
    private bitacoraModel: Model<Bitacora>,

  ) {}
  
  async create(bitacora: Bitacora, user: User): Promise<Bitacora> {
    if (!user) {
      throw new Error('Usuario no autenticado. Debes iniciar sesión para realizar esta acción.');
    }
  
    // Verifica que el usuario tenga el rol de "Supervisor"
    if (user.role !== 'Guardia') {
      throw new ConflictException('No tienes permisos para realizar esta acción. Debes ser Guardia.');
    }
  
    // Validar userId
    if (!mongoose.Types.ObjectId.isValid(bitacora.userId)) {
      throw new ConflictException('El userId proporcionado no es válido.');
    }
  
    // Asigna el ID del usuario explícitamente a la nueva persona
    const data = { ...bitacora }; // Copia el objeto horario
  
    // Crea la nueva persona en la base de datos
    const res = await this.bitacoraModel.create(data);
    return res;
  }


  async findAll(query: Query): Promise<Bitacora[]> {
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

    const bitacora = await this.bitacoraModel
      .find({ ...keyword })
      .limit(resPerPage)
      .skip(skip);
    return bitacora;
  }

  async findByUserId(id: string): Promise<Bitacora> {
    const isValidId = mongoose.isValidObjectId(id);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }

    const bitacora = await this.bitacoraModel.findById( id);

    if (!bitacora) {
      throw new NotFoundException('No se encontró la bitacora');
    }

    return bitacora;
  }

  async updateByUserId(userId: string, horarioData: Partial<Bitacora>): Promise<Bitacora> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }
    const bitacora = await this.bitacoraModel.findByIdAndUpdate(userId , horarioData, {
      new: true,
      runValidators: true,
    });

    if (!bitacora) {
      throw new NotFoundException('No se encontró la bitacora');
    }

    return bitacora;
  }

  async deleteByUserId(userId: string): Promise<Bitacora> {
    const isValidId = mongoose.isValidObjectId(userId);

    if (!isValidId) {
      throw new BadRequestException('Ingrese el Id correcto');
    }
    const bitacora = await this.bitacoraModel.findByIdAndDelete( userId );

    if (!bitacora) {
      throw new NotFoundException('No se encontró la bitacora');
    }

    return bitacora;
  }
}
