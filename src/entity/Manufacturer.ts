import { Entity, PrimaryGeneratedColumn, Column, OneToMany, BaseEntity } from "typeorm"; 
import { Pedal } from "./Pedal";
import { ObjectType, Field, Ctx } from "type-graphql";
import { Lazy } from "../helpers";
import { AppContext } from "../types/Context";

@ObjectType()
@Entity()
export class Manufacturer extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  country: string;

  //expensive, can't really tink of a way to dataload it
  @OneToMany(() => Pedal, pedal => pedal.manufacturerConnection)
  pedalsConnection: Promise<Pedal[]>;

  @Field(() => [Pedal], {nullable: true})
  pedals(@Ctx() { manufacturerPedalsLoader }: AppContext): Promise<Pedal>|null {
    return manufacturerPedalsLoader.load(this.id);
  }
}