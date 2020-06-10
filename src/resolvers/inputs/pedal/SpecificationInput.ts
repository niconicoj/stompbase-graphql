import { InputType, Field } from "type-graphql";
import { DimensionInput } from './DimensionInput';

@InputType()
export class SpecificationInput {
  @Field({nullable: true})
  currentDraw?: number;

  @Field({nullable: true})
  voltage?: number;

  @Field({nullable: true})
  trueBypass?: boolean;

  @Field({nullable: true})
  inputImpedance?: number;

  @Field({nullable: true})
  outputImpedance?: number;

  @Field({nullable: true})
  dimension?: DimensionInput;
}