import { ObjectType, Field } from "type-graphql";
import { Dimension } from './Dimension';
import { Column } from "typeorm";

@ObjectType()
export class Specification {
  @Field({nullable: true})
  @Column({nullable: true})
  currentDraw: number;

  @Field({nullable: true})
  @Column({nullable: true})
  voltage: number;

  @Field({nullable: true})
  @Column({nullable: true})
  trueBypass: boolean;

  @Field({nullable: true})
  @Column({nullable: true})
  inputImpedance: number;

  @Field({nullable: true})
  @Column({nullable: true})
  outputImpedance: number;

  @Field({nullable: true})
  @Column(() => Dimension)
  dimension: Dimension;
}