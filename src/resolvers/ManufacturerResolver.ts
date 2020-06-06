import { Resolver, InputType, Field } from "type-graphql";
import { Manufacturer } from "../entity/Manufacturer";
import { createBaseCrudResolver } from "./CrudBaseResolver";

@InputType()
class ManufacturerType {
  @Field()
  name: string;

  @Field()
  country: string;
}

@InputType()
class ManufacturerOptions {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  country?: string;
}

const BaseCrudManufacturerResolver = createBaseCrudResolver(
  "manufacturer",
  ManufacturerType,
  ManufacturerOptions,
  Manufacturer
)

@Resolver()
export class ManufacturerResolver extends BaseCrudManufacturerResolver{
  
}