import { InputType, Field } from "type-graphql";
import { Specification } from "../../../entity/objects/Specification";
import { SpecificationInput } from "./SpecificationInput";
import { ControlInput } from "./ControlInput";
import { Control } from "../../../entity/objects/Control";
import { IsPedalDoesNotExist } from "../../../resolvers/validators/isPedalDoesNotExist";

@InputType()
export class VersionInput {
  @Field()
  name: string;

  @Field()
  content: string;

  @Field(() => SpecificationInput, {nullable: true})
  specification?: Specification;

  @Field(() => [ControlInput], {nullable: true})
  controls?: Control[];

  @Field({nullable:true})
  @IsPedalDoesNotExist({message: "Pedal does not exist."})
  pedalId: string;
}

@InputType()
export class VersionOptions {
  @Field({nullable: true})
  name: string;

  @Field({nullable: true})
  content: string;

  @Field(() => SpecificationInput, {nullable: true})
  specification: Specification;

  @Field(() => [ControlInput], {nullable: true})
  controls: Control[];
}