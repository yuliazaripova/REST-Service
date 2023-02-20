import { TrackEntity } from '../track/track.entity';
import {
  ChildEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity('favs')
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class FavsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  type: string;

  @OneToOne(() => TrackEntity, (track) => track.favs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id' })
  track: TrackEntity;

    // @Column('string')
    // type: string[];

  // @Column("string", { array: true })
  // artists: string[];

  // @Column("string", { array: true })
  // albums: string[];

  // @Column("string", { array: true })
  // tracks: string[];

  // @OneToMany(() => TrackEntity, (track) => track.artist)
  // tracksEntity: TrackEntity[];
}


