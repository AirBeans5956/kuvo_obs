import { ConnectStatus, KuvoTrack } from '../../types/kuvo_obs';

interface IKuvoState {
  isConnected: boolean;
  connectStatus: ConnectStatus;
  enableAutoRefresh: boolean;
  playlistId: number;
  trackData: KuvoTrack|null;
}

export {
  IKuvoState
};
