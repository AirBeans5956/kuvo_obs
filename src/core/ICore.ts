import { ITask } from '../states/ITask';
import { KuvoTrack } from '../types/kuvo_obs';

export default interface ICore {
  // loadTaskList: () => Promise<ITask[]>;
  // saveTask: (task: ITask) => Promise<ITask[]>;
  // deleteTask: (taskId: string) => Promise<ITask[]>;
  connectObs: (port: number, password: string) => Promise<boolean>;
  disconnectObs: () => Promise<boolean>;
  showTrackData: (track: KuvoTrack | null) => Promise<void>;
  fetchTrackData: (playlistId: number) => Promise<KuvoTrack|null>;
  refreshTrackData: (playlistId: number) => Promise<void>;

}

declare global {
  interface Window {
    myApp: ICore;
    kuvo_obs: ICore;
  }
}
