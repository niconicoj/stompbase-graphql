import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments, registerDecorator, ValidationOptions } from 'class-validator';
import { Manufacturer } from '../../entity/Manufacturer';

@ValidatorConstraint({async: true})
export class IsManufacturerDoesNotExistConstraint implements ValidatorConstraintInterface {
  validate(manufacturerId: string ) {
    return Manufacturer.findOne({id: manufacturerId}).then(manufacturer => {
      return manufacturer ? true : false;
    })
  }
}

export function IsManufacturerDoesNotExist(validateOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validateOptions,
      constraints: [],
      validator: IsManufacturerDoesNotExistConstraint
    })
  }
}