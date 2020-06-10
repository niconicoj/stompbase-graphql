import { ObjectType, Field } from "type-graphql";
import { Column } from "typeorm";

@ObjectType()
export class Dimension {
  @Field()
  @Column({nullable: true})
  x: number;

  @Field()
  @Column({nullable: true})
  y: number;

  @Field()
  @Column({nullable: true})
  z: number;
}