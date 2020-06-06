import * as DataLoader from 'dataloader';
import { Manufacturer } from '../entity/Manufacturer';
import { Pedal } from '../entity/Pedal';

export interface AppContext {
  manufacturerLoader: DataLoader<string, Manufacturer>;
  manufacturerPedalsLoader: DataLoader<string, Pedal>;
}