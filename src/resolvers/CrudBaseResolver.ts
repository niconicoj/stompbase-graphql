import { ClassType, Resolver, Query, Arg, Mutation } from "type-graphql";

export function createBaseCrudResolver<T extends ClassType, X extends ClassType>(
  suffix: string,
  InputType: T,
  OptionsType: X,
  Entity: any
) {
  const ucSuffix = suffix.charAt(0).toUpperCase() + suffix.substring(1);

  @Resolver({isAbstract: true})
  abstract class BaseCrudResolver {
    @Query(() => [Entity], { name: `${suffix}s`})
    get(
      @Arg('options', () => OptionsType, {nullable: true}) options: typeof OptionsType
    ) {
      return Entity.find(options);
    }

    @Mutation(() => Entity, {name: `create${ucSuffix}`})
    async create( 
      @Arg('options', () => InputType ) options: T,
    ) {
      const entity = await Entity.create(options).save();
      return entity;
    }

    @Mutation(() => Boolean, { name: `update${ucSuffix}`})
    async update(
      @Arg('id', () => String) id: string,
      @Arg('options', () => OptionsType ) options: typeof OptionsType
    ) {
      await Entity.update({id}, options);
      return true;
    }

    @Mutation(() => Boolean, { name: `delete${ucSuffix}`})
    async delete(
      @Arg('id', () => String) id: string
    ) {
      await Entity.delete({id});
      return true;
    }
  }

  return BaseCrudResolver;
}