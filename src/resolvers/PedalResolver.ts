import { Resolver, Mutation, Arg, InputType, Field } from "type-graphql";
import { Pedal } from "../entity/Pedal";
import { createBaseCrudResolver } from "./CrudBaseResolver";
import { IsManufacturerDoesNotExist } from "./validators/isManufacturerDoesNotExist";
import { Version } from "../entity/Version";
import { VersionInput } from "./inputs/pedal/VersionInput";
import { getManager } from "typeorm";
import { MinLength, ArrayMinSize } from "class-validator";

@InputType()
class PedalInput {
  @Field()
  name: string;

  @Field(() => [VersionInput])
  @ArrayMinSize(1)
  versions: Version[];

  @Field(() => String, {nullable: true})
  @IsManufacturerDoesNotExist({message: "Manufacturer does not exists."})
  manufacturerId: string;
}

@InputType()
class PedalOptions {
  @Field(() => String, {nullable: true})
  id?: string;

  @Field(() => String, {nullable: true})
  name?: string;

  @Field(() => [VersionInput], {nullable: true})
  versions?: Version[];

  @Field(() => String, {nullable: true})
  @IsManufacturerDoesNotExist({message: "Manufacturer does not exists."})
  manufacturerId?: string
}

const BaseCrudPedalResolver = createBaseCrudResolver(
  "pedal",
  PedalInput,
  PedalOptions,
  Pedal
)

@Resolver()
export class PedalResolver extends BaseCrudPedalResolver{

  @Mutation(() => Boolean, {name: `createPedal`})
  // @ts-ignore It looks like a code inferrence problem
  async create( 
    @Arg('options', () => PedalInput ) options: PedalInput,
  ) {
    const {versions, ...pedal} = options;
    
    await getManager().transaction(async transactionalEntityManager => {
      const pedalEntity = Pedal.create(pedal);
      const createdPedal = await transactionalEntityManager.save(pedalEntity);
      const versionEntities = versions.map(v => Version.create({pedalId: createdPedal.id, ...v}));
      await transactionalEntityManager.save(versionEntities);
    });
    return true;
  }
}