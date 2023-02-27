import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateParcelDto } from './models/dto/create-parcel.dto';
import { Parcel } from './models/parcel.entity';
import { SearchFilter } from './models/search-filter';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  async paginate(options: IPaginationOptions): Promise<Pagination<Parcel>> {
    const queryBuilder = this.parcelRepository.createQueryBuilder('parcel');
    queryBuilder
      .select([
        'parcel.uuid',
        'parcel.parcelSKU',
        'parcel.description',
        'parcel.address',
        'parcel.country',
        'parcel.town',
        'parcel.state',
        'parcel.deliverydate',
      ])
      .orderBy({
        "CASE WHEN parcel.country = 'Estonia' THEN parcel.country END": 'DESC',
        'parcel.deliverydate': 'ASC',
      })
      .getMany();
    return paginate<Parcel>(queryBuilder, options);
  }

  async paginateWithFilters(
    options: IPaginationOptions,
    filter: SearchFilter,
  ): Promise<Pagination<Parcel>> {
    const queryBuilder = this.parcelRepository.createQueryBuilder('parcel');
    queryBuilder.orderBy('deliveryDate', 'ASC');

    if (filter != null) {
      if (filter.country) {
        queryBuilder.andWhere('parcel.country LIKE :country', {
          country: `%${filter.country}%`,
        });
      }

      if (filter.description) {
        queryBuilder.andWhere('parcel.description LIKE :description', {
          description: `%${filter.description}%`,
        });
      }
    }

    queryBuilder.getMany();

    return paginate<Parcel>(queryBuilder, options);
  }

  getParcel(uuid: string): Observable<Parcel> {
    return from(this.parcelRepository.findOneBy({ uuid }));
  }

  async createParcel(createParcelDto: CreateParcelDto): Promise<Parcel> {
    const existingParcel = await this.parcelRepository.findOne({
      where: { parcelSKU: createParcelDto.parcelSKU },
    });

    if (existingParcel) {
      throw new HttpException(
        'Parcel SKU already exists!',
        HttpStatus.BAD_REQUEST,
      );
    }

    return this.parcelRepository.save(createParcelDto);
  }

  removeParcel(uuid: string): Observable<any> {
    return from(this.parcelRepository.delete(uuid));
  }
}
