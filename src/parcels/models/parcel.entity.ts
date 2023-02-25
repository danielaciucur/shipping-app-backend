import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Parcel {
  @PrimaryGeneratedColumn('uuid')
  uuid?: string;

  @Column({ unique: true, nullable: false })
  parcelSKU?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: true })
  address?: string;

  @Column({ nullable: true })
  town?: string;

  @Column({ nullable: true })
  state?: string;

  @Column({ nullable: true })
  country?: string;

  @Column({ type: 'datetime', nullable: true })
  deliveryDate?: Date;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  constructor(_init?: Partial<Parcel>) {}
}
