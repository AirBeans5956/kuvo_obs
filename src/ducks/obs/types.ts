import { ObsConnectStatus } from '../../types/kuvo_obs';

export interface IObsState {
  isConnected: boolean;
  connectStatus: ObsConnectStatus;
}
