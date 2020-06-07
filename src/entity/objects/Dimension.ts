import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Dimension {
  @Field()
  x: number;

  @Field()
  y: number;

  @Field()
  z: number;
}