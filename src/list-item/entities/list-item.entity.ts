import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { List } from 'src/list/entities/list.entity';
import { Radio } from 'src/radio/entities/radio.entity';

@Entity()
export class ListItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => List, (list) => list.listItems)
  list: List;

  @ManyToOne(() => Radio, (radio) => radio.listItems)
  radio: Radio;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

}
