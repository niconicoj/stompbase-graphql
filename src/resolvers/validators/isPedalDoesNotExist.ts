import { registerDecorator, ValidationOptions } from 'class-validator';
import { createDoesNotExistConstraint } from './factories/DoesNotExistFactory';
import { Pedal } from '../../entity/Pedal';

const pedalDoesNotExistConstraint = createDoesNotExistConstraint(Pedal);

export function IsPedalDoesNotExist(validateOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validateOptions,
      constraints: [],
      validator: pedalDoesNotExistConstraint
    })
  }
}