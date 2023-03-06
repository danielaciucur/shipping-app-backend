import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
/* import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate'; */
import { from, Observable } from 'rxjs';
import { Repository } from 'typeorm';
import { CreateParcelDto } from './models/dto/create-parcel.dto';
import { ParcelResponse } from './models/parcel-response';
import { Parcel } from './models/parcel.entity';
import { SearchFilter } from './models/search-filter';

@Injectable()
export class ParcelsService {
  constructor(
    @InjectRepository(Parcel)
    private parcelRepository: Repository<Parcel>,
  ) {}

  async paginate(
    page = 1,
    limit = 10,
    filter?: SearchFilter,
  ): Promise<ParcelResponse> {
    const queryBuilder = this.parcelRepository.createQueryBuilder('parcel');

    if (filter != null) {
      if (filter.country) {
        queryBuilder.andWhere('country ilike :country', {
          country: `%${filter.country}%`,
        });
      }

      if (filter.description) {
        queryBuilder.andWhere('description ilike :description', {
          description: `%${filter.description}%`,
        });
      }
    }

    const [data, total] = await queryBuilder
      .orderBy(
        `CASE WHEN country = 'Estonia' THEN 1 ELSE 2 END, deliveryDate`,
        'ASC',
      )
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const currentPage = page;
    const totalPages = Math.ceil(total / limit);

    return new ParcelResponse(data, total, currentPage, totalPages);
  }

  /* async paginate(
    options: IPaginationOptions,
    filter: SearchFilter,
  ): Promise<Pagination<Parcel>> {
    const queryBuilder = this.parcelRepository.createQueryBuilder('parcel');
    queryBuilder.orderBy(
      `CASE WHEN country = 'Estonia' THEN 1 ELSE 2 END, deliveryDate`,
      'ASC',
    );

    if (filter != null) {
      if (filter.country) {
        queryBuilder.andWhere('parcel.country ilike :country', {
          country: `%${filter.country}%`,
        });
      }

      if (filter.description) {
        queryBuilder.andWhere('parcel.description ilike :description', {
          description: `%${filter.description}%`,
        });
      }
    }

    queryBuilder.getMany();

    return paginate<Parcel>(queryBuilder, options);
  } */

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
