import { ValidatorConstraintInterface, ValidatorConstraint } from "class-validator";

export function createDoesNotExistConstraint(
  Entity: any
) {
  @ValidatorConstraint({async: true})
  class DoesNotExistConstraint implements ValidatorConstraintInterface {
    validate(objectId: string) {
      console.log("validating existence of", objectId);
      return Entity.findOne({id: objectId}).then((object: any) => {
        return object ? true : false;
      })
    }
  }
  return DoesNotExistConstraint;
}