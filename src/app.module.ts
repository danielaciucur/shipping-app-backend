import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Parcel } from './parcels/models/parcel.entity';
import { ParcelsModule } from './parcels/parcels.module';

@Module({
  imports: [
    ParcelsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [Parcel]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
