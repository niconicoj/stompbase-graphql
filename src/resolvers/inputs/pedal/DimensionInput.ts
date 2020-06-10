import { InputType, Field } from "type-graphql";

@InputType()
export class DimensionInput {
  @Field()
  x: number;

  @Field()
  y: number;

  @Field()
  z: number;
}