import { IsNotEmpty, IsString, IsEnum } from 'class-validator';

export enum DiaSemana {
  LUNES = 'LUNES',
  MARTES = 'MARTES',
  MIERCOLES = 'MIERCOLES',
  JUEVES = 'JUEVES',
  VIERNES = 'VIERNES',
  SABADO = 'SABADO',
  DOMINGO = 'DOMINGO',
}

export class UpdateHorarioDto {
  @IsNotEmpty()
  @IsString()
  readonly userId: string;// ID del guardia asignado al horario

  @IsNotEmpty()
  @IsEnum(DiaSemana)
  readonly diaSemana: DiaSemana; // Día de la semana del horario

  @IsNotEmpty()
  readonly fecha: string;

  @IsNotEmpty()
  readonly horaInicio: string; // Hora de inicio del horario (formato ISO 8601)

  @IsNotEmpty()
  readonly horaFin: string; // Hora de fin del horario (formato ISO 8601)
}
