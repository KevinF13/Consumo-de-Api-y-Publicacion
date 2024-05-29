import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { DiaSemana } from '../dto/create-horario.dto';

@Schema({ timestamps: true })
export class Horario{
  @Prop({ type: mongoose.Schema.Types.ObjectId
  })
  userId: string;

  @Prop({ required: true, enum: DiaSemana })
  diaSemana: DiaSemana;

  @Prop({ required: true })
  fecha: string;

  @Prop({ required: true })
  horaInicio: string;

  @Prop({ required: true })
  horaFin: string;
}

export const HorarioSchema = SchemaFactory.createForClass(Horario);
