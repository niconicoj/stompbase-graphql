import DataLoader from 'dataloader';
import { Pedal } from '../entity/Pedal';
import { In } from 'typeorm';

export const manufacturerPedalsLoader = (): DataLoader<string, Pedal[]> =>
  new DataLoader(async (keys) => {
    let mutableKeys = keys.map(e => e);
    let pedals = await Pedal.find({manufacturerId: In(mutableKeys)});

    const pedalMap: {[key: string]: Pedal[]} = {};

    keys.map(e => pedalMap[e] = []);

    pedals.forEach((pedal: Pedal) => {
      pedalMap[pedal.manufacturerId]!.push(pedal);
    });

    return keys.map(k => pedalMap[k]);
  });