import { Module } from '@nestjs/common';
import { BitacoraService } from './bitacora.service';
import { BitacoraController } from './bitacora.controller';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BitacoraSchema } from './entities/bitacora.entity';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: 'Bitacora', schema: BitacoraSchema }]),
    
  ],
  controllers: [BitacoraController],
  providers: [BitacoraService]
})
export class BitacoraModule {}
