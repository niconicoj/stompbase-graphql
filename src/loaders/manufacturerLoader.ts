import DataLoader from 'dataloader';
import { Manufacturer } from '../entity/Manufacturer';

export const manufacturerLoader = (): DataLoader<string, Manufacturer> =>
  new DataLoader(async (keys) => {
    let mutableKeys = keys.map(e => e);
    const manufacturers = await Manufacturer.findByIds(mutableKeys);

    const manufacturerMap: {[key: string]: Manufacturer} = {};

    manufacturers.forEach((man: Manufacturer) => {
      manufacturerMap[man.id] = man;
    });

    return keys.map(k => manufacturerMap[k]);
  });