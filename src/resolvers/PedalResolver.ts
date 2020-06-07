import { Resolver, Mutation, Arg, InputType, Field } from "type-graphql";
import { Pedal } from "../entity/Pedal";
import { createBaseCrudResolver } from "./CrudBaseResolver";
import { IsManufacturerDoesNotExist } from "./validators/isManufacturerDoesNotExist";
import { Version } from "../entity/Version";

@InputType()
class PedalType {
  @Field()
  name: string;

  @Field(() => SeriesInput)
  series: Version[];

  @Field(() => String, {nullable: true})
  @IsManufacturerDoesNotExist({message: "Manufacturer does not exists."})
  manufacturerId: string
}

@InputType()
class SeriesInput {
  @Field()
  name: string;

  @Field()
  date: string;
}

@InputType()
class PedalOptions {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => SeriesInput, {nullable: true})
  versions?: Version[];

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