import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class AuthService {
  findOne(arg0: { role: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const { name, email, password, role } = signUpDto;

    // Validar el DTO utilizando class-validator
    const errors = await validate(signUpDto);
    if (errors.length > 0) {
      const validationErrors = errors
        .map((error) => Object.values(error.constraints))
        .join(', ');
      throw new UnauthorizedException(`Validation error: ${validationErrors}`);
    }

    // Verificar si el correo electrónico ya está registrado
    const existingEmailUser = await this.userModel.findOne({ email });
    if (existingEmailUser) {
      throw new ConflictException('El correo electrónico ya está registrado en la base de datos');
    }

    // Verificar si el nombre ya está registrado
    const existingNameUser = await this.userModel.findOne({ name });
    if (existingNameUser) {
      throw new ConflictException('Este nombre ya esta registrado en la base de datos');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPassword,
      role, // Asignar el rol al crear el usuario
      isActive: true, // Establecer isActive en true por defecto
    });

    // Generar token JWT
    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; userId: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Email o contraseña inválida');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('El usuario está inactivo');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Email o contraseña inválida');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token, userId: user._id };
  }


  async findOneByRole(role: string): Promise<User | null> {
    try {
      const user = await this.userModel.findOne({ role }).exec();
      return user;
    } catch (error) {
      console.error(`Error al buscar usuario por rol: ${error.message}`);
      return null;
    }
  }
  
}
