import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from 'src/city/entities/city.entity';

@Entity()
export class Radio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  shortName: string;

  @Column()
  streamUrl: string;

  @Column()
  imageUrl: string;

  @Column()
  hsl: boolean;

  @ManyToOne(() => City, (city) => city.radios)
  city: City;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
