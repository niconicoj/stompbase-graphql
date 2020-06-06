import { Resolver, Mutation, Arg, InputType, Field } from "type-graphql";
import { Pedal } from "../entity/Pedal";
import { createBaseCrudResolver } from "./CrudBaseResolver";
import { IsManufacturerDoesNotExist } from "./validators/isManufacturerDoesNotExist";

@InputType()
class PedalType {
  @Field()
  name: string;

  @Field()
  category: string;

  @Field(() => String, {nullable: true})
  @IsManufacturerDoesNotExist({message: "Manufacturer does not exists."})
  manufacturerId: string
}

@InputType()
class PedalOptions {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => String, {nullable: true})
  category?: string;

  @Field(() => String, {nullable: true})
  @IsManufacturerDoesNotExist({message: "Manufacturer does not exists."})
  manufacturerId?: string
}

const BaseCrudPedalResolver = createBaseCrudResolver(
  "pedal",
  PedalType,
  PedalOptions,
  Pedal
)

@Resolver()
export class PedalResolver extends BaseCrudPedalResolver{

}