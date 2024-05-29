import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateBitacoraDto  {
  
    @IsNotEmpty()
    @IsString()
    readonly fechaHorario: string;
  
    @IsNotEmpty()
    @IsString()
    readonly turnoHorario: string;
  
    @IsNotEmpty()
    @IsString()
    readonly cliente: string;
  
    @IsNotEmpty()
    @IsString()
    readonly nombreAgente: string;
  
    @IsNotEmpty()
    @IsString()
    readonly prendas: string;
  
    @IsNotEmpty()
    @IsString()
    readonly horaNovedades: string;
  
    @IsNotEmpty()
    @IsString()
    readonly novedades: string;
  }