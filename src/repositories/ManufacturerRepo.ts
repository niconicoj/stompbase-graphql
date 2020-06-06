import { EntityRepository, Repository } from "typeorm";
import { Manufacturer } from "../entity/Manufacturer";


@EntityRepository(Manufacturer)
export class ManufacturerRepository extends Repository<Manufacturer> {

  async findByName(name: string): Promise<Manufacturer|undefined> {
    return Manufacturer.findOne({name});
  }

  async suggestByName(
    name: string,
    limit: number,
    offset: number
    ): Promise<Manufacturer[]> {
    const query = this.createQueryBuilder('manufacturer')
      .orderBy("name","DESC")
      .take(limit +1)
      .skip(limit * offset);

    return await query.getMany();
  }
}