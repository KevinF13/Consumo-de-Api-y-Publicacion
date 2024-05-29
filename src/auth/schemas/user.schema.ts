import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserRole = 'Supervisor' | 'Guardia';

@Schema({
  timestamps: true,
})
export class User extends Document {
  @Prop()
  name: string;

  @Prop({ unique: true, message: 'Duplicate email entered' })
  email: string;

  @Prop()
  password: string;

  @Prop({ type: String, enum: ['Supervisor', 'Guardia'], default: 'Guardia' })
  role: UserRole;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
