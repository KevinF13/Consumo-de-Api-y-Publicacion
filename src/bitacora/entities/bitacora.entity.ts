import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Bitacora{
  @Prop({ type: mongoose.Schema.Types.ObjectId
  })
  userId: string;

  @Prop({ required: true })
  fechaHorario: string;

  @Prop({ required: true })
  turnoHorario: string;

  @Prop({ required: true })
  cliente: string;

  @Prop({ required: true })
  nombreAgente: string;

  @Prop({ required: true })
  prendas: string;

  @Prop({ required: true })
  horaNovedades: string;

  @Prop({ required: true })
  novedades: string;
}

export const BitacoraSchema = SchemaFactory.createForClass(Bitacora);
