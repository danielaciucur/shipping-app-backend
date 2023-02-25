import { Module } from '@nestjs/common';
import { ParcelsService } from './parcels.service';
import { ParcelsController } from './parcels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parcel } from './models/parcel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Parcel])],
  providers: [ParcelsService],
  controllers: [ParcelsController],
})
export class ParcelsModule {}
