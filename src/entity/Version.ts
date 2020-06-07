import { ObjectType, Field } from "type-graphql";
import { Specification } from "./objects/Specification";
import { Control } from "./objects/Control";
import { Entity, OneToOne, Column, JoinColumn, BaseEntity, PrimaryGeneratedColumn } from "typeorm";
import { Pedal } from "./Pedal";
import { Lazy } from "../helpers";

@ObjectType()
@Entity({name: "pedalVersion"})
export class Version extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  content: string;

  @Field(() => Specification, {nullable: true})
  specification: Specification;

  @Field(() => Control, {nullable: true})
  controls: Control[];

  @Column("uuid")
  pedalId: string;

  @OneToOne(() => Pedal, pedal => pedal.versions)
  @JoinColumn({ name: "pedalId" })
  pedalConnection: Lazy<Pedal>;


}