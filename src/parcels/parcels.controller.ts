import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
/* import { Pagination } from 'nestjs-typeorm-paginate';*/
import { from, Observable } from 'rxjs';
import { CreateParcelDto } from './models/dto/create-parcel.dto';
import { ParcelResponse } from './models/parcel-response';
import { Parcel } from './models/parcel.entity';
import { SearchFilter } from './models/search-filter';
import { ParcelsService } from './parcels.service';

@Controller('parcels')
export class ParcelsController {
  constructor(private parcelService: ParcelsService) {}

  @Get()
  index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('description') description: string,
    @Query('country') country: string,
  ): Observable<ParcelResponse> {
    limit = limit > 100 ? 100 : limit;

    return this.parcelService.paginate(
      page,
      limit,
      new SearchFilter(country, description),
    );
  }

  /*  @Get()
  async index(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('description') description: string,
    @Query('country') country: string,
  ): Promise<Pagination<Parcel>> {
    limit = limit > 100 ? 100 : limit;

    return this.parcelService.paginate({
        page: Number(page),
        limit: Number(limit),
        route: 'http://localhost:3000/api/users',
      }, new SearchFilter(country, description),);
  } */

  @Post('create')
  create(@Body() createParcelDto: CreateParcelDto): Observable<Parcel> {
    return from(this.parcelService.createParcel(createParcelDto));
  }

  @Delete('/delete/:id')
  delete(@Param('id') id: string): Observable<void> {
    return this.parcelService.removeParcel(id);
  }
}
