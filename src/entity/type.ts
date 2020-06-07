import { GraphQLScalarType, GraphQLObjectType } from "graphql"

type Pedal = {
  name: string,
  content: string, 
  variation: Series[]
}

type Series = {
  name: string,
  images: string[]
  content: string 
  specification: Specification
  controls: Control[]
}

type Specification = {
  currentDraw: string,
  InputImpedance: number,
  outputImpedance: number,
  trueBypass: boolean,
  voltage: number,
  dimension: {
    x: number,
    y: number,
    z: number
  } 
}

export type Control = {
  type: string,
  name: string
}