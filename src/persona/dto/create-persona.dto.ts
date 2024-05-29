import { IsBoolean, IsEmpty, IsNotEmpty, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'mongoose';
import { User } from 'src/auth/schemas/user.schema';

export class CreatePersonaDto {
  @IsNotEmpty()
  @IsString()
  readonly nombres: string;

  @IsNotEmpty()
  @IsString()
  readonly apellidos: string;

  @IsNotEmpty()
  @IsString()
  readonly cedula: string;

  @IsNotEmpty()
  @IsString()
  readonly fechaNacimiento: string;

  @IsNotEmpty()
  @IsString()
  readonly direccionDomicilio: string;

  @IsNotEmpty()
  @IsString()
  readonly telefono: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly manejaArma: boolean;

  @IsNotEmpty()
  @IsString()
  readonly imagen: string;

  @IsNotEmpty()
  @IsString()
  readonly fechaIngreso: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}