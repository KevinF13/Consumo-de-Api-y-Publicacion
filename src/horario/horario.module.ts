import { Module } from '@nestjs/common';
import { HorarioService } from './horario.service';
import { HorarioController } from './horario.controller';
import { AuthModule } from '../auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { HorarioSchema } from './schemas/horario.schema';
import { UserSchema } from 'src/auth/schemas/user.schema';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Horario', schema: HorarioSchema }]),
    
  ],
  controllers: [HorarioController],
  providers: [HorarioService]
})
export class HorarioModule {}
