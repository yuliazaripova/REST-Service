import { TrackEntity } from "../../track/track.entity";
import { ChildEntity, Column, OneToOne, JoinColumn } from "typeorm";
import { FavsEntity } from "../favorites.entity";

@ChildEntity()
export class TrackFavEntity extends FavsEntity {

  @Column()
  type: string;

  @OneToOne(() => TrackEntity, (track) => track.favs, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'trackId' })
  track: TrackEntity;
}