import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { City } from 'src/city/entities/city.entity';
import { Category } from 'src/category/entities/category.entity';

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

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
