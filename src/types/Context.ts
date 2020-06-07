import * as DataLoader from 'dataloader';
import { Manufacturer } from '../entity/Manufacturer';
import { Pedal } from '../entity/Pedal';
import { Version } from 'src/entity/Version';

export interface AppContext {
  manufacturerLoader: DataLoader<string, Manufacturer>;
  manufacturerPedalsLoader: DataLoader<string, Pedal>;
  pedalVersionsLoader: DataLoader<string, Version>;
}