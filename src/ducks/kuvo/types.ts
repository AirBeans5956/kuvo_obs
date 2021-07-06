import { KuvoTrack } from '../../types/kuvo_obs';

interface IKuvoState {
  isConnected: boolean;
  enableAutoRefresh: boolean;
  playlistId: number;
  trackData: KuvoTrack|null;
}

export {
  IKuvoState
};
