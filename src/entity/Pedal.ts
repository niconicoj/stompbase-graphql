import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToOne, OneToMany } from "typeorm";
import { Field, ObjectType, Ctx } from "type-graphql";

import { Manufacturer } from "./Manufacturer";
import { Lazy } from "../helpers";
import { AppContext } from '../types/Context';
import { Version } from "./Version";
import { pedalVersionsLoader } from "../loaders/pedalVersionsLoader";

@ObjectType()
@Entity()
export class Pedal extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Column("uuid", {nullable: true})
  manufacturerId: string;

  @ManyToOne(() => Manufacturer, manufacturer => manufacturer.pedals, {})
  @JoinColumn({ name: "manufacturerId" })
  manufacturerConnection: Lazy<Manufacturer>;

  @Field(() => Manufacturer, {nullable: true})
  manufacturer(@Ctx() { manufacturerLoader }: AppContext): Promise<Manufacturer>|null {
    if(this.manufacturerId) {
      return manufacturerLoader.load(this.manufacturerId);
    } else {
      return null
    }
  }

  @Field(() => [Version], {nullable: true})
  versions(@Ctx() { pedalVersionsLoader }: AppContext): Promise<Version>|null {
    return pedalVersionsLoader.load(this.id);
  }
  
  @OneToMany(() => Version, version => version.pedalConnection)
  versionsConnection: Promise<Version[]>;
}

