import { ObjectType, Field } from "type-graphql";
import { Entity, Column, JoinColumn, BaseEntity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { JsonTransformer } from '@anchan828/typeorm-transformers';

import { Pedal } from "./Pedal";
import { Control } from "./objects/Control";
import { Specification } from "./objects/Specification";
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
  @Column(() => Specification)
  specification: Specification;

  @Field(() => Control, {nullable: true})
  @Column({type: "text", transformer: new JsonTransformer<Control[]>(), nullable: true})
  controls: Control[];

  @Column()
  pedalId: string;

  @ManyToOne(() => Pedal, pedal => pedal.versions, {onDelete: "CASCADE"})
  @JoinColumn({ name: "pedalId" })
  pedalConnection: Lazy<Pedal>;
}