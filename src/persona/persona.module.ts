import { Module } from '@nestjs/common';
import { PersonaService } from './persona.service';
import { PersonaController } from './persona.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonaSchema } from './entities/persona.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Persona', schema: PersonaSchema }]),
  ],
  controllers: [PersonaController],
  providers: [PersonaService]
})
export class PersonaModule {}
