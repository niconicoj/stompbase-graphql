import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Control {
  @Field()
  label: string;

  @Field()
  text: string;
}