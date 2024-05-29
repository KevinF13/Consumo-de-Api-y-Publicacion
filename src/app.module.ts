import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { AuthModule } from './auth/auth.module';
import { HorarioModule } from './horario/horario.module';
import { PersonaModule } from './persona/persona.module';
import { BitacoraModule } from './bitacora/bitacora.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    BookModule,
    AuthModule,
    HorarioModule,
    PersonaModule,
    BitacoraModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
