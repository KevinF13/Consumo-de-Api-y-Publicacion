import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { User } from "src/auth/schemas/user.schema";

@Schema({
  timestamps: true,
})
export class Persona {
  @Prop()
  nombres: string;

  @Prop()
  apellidos: string;

  @Prop()
  cedula: string;

  @Prop()
  fechaNacimiento: string;

  @Prop()
  direccionDomicilio: string;

  @Prop()
  telefono: string;

  @Prop()
  manejaArma: boolean;

  @Prop()
  imagen: string;

  @Prop()
  fechaIngreso: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId
  })
  userId: string;
}

export const PersonaSchema = SchemaFactory.createForClass(Persona);