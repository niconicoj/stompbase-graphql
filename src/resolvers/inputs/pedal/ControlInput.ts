import { InputType, Field } from "type-graphql";

@InputType()
export class ControlInput {
  @Field()
  label: string;

  @Field()
  text: string;
}