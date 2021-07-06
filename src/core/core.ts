import fs from 'fs-extra';
import os from 'os';
import path from 'path';
import shortid from 'shortid';
import { ITask } from '../states/ITask';
import ICore from './ICore';
import { connectObs, disconnectObs, showTrackData } from './modules/obs';
import { fetchTrackData } from './modules/kuvo';

const dataFilePath = path.join(os.homedir(), 'todo.json');

const setTimeoutPromise = (count: number): Promise<void> => {
  return new Promise<void>(resolve => {
    setTimeout(() => {
      resolve();
    }, count);
  });
};

const refreshTrackData = async (playlistId: number): Promise<void> => {
  process.stdout.write('Refreshing...');
  const data = await fetchTrackData(playlistId);
  await showTrackData(data);
  console.log('Complete!!');
}

const core: ICore = {
  connectObs,
  disconnectObs,
  showTrackData,
  fetchTrackData,
  refreshTrackData
};

export default core;
