import DataLoader from 'dataloader';
import { In } from 'typeorm';
import { Version } from '../entity/Version';

export const pedalVersionsLoader = (): DataLoader<string, Version[]> =>
  new DataLoader(async (keys) => {
    let mutableKeys = keys.map(e => e);
    let versions = await Version.find({pedalId: In(mutableKeys)});

    const versionMap: {[key: string]: Version[]} = {};

    keys.map(e => versionMap[e] = []);

    versions.forEach((version: Version) => {
      versionMap[version.pedalId]!.push(version);
    });

    return keys.map(k => versionMap[k]);
  });