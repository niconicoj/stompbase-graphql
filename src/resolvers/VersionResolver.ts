import { Resolver } from "type-graphql";
import { createBaseCrudResolver } from "./CrudBaseResolver";
import { Version } from "../entity/Version";
import { VersionInput, VersionOptions } from "./inputs/pedal/VersionInput";

const BaseCrudVersionResolver = createBaseCrudResolver(
  "version",
  VersionInput,
  VersionOptions,
  Version
)

@Resolver()
export class VersionResolver extends BaseCrudVersionResolver{

}