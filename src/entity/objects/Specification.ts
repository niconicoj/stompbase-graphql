import { ObjectType, Field } from "type-graphql";
import { Dimension } from './Dimension';

@ObjectType()
export class Specification {
  @Field({nullable: true})
  currentDraw: number;

  @Field({nullable: true})
  voltage: number;

  @Field({nullable: true})
  trueBypass: boolean;

  @Field({nullable: true})
  inputImpedance: number;

  @Field({nullable: true})
  outputImpedance: number;

  @Field({nullable: true})
  dimension: Dimension;
}