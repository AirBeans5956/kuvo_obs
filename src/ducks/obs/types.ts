import { ConnectStatus } from '../../types/kuvo_obs';

export interface IObsState {
  isConnected: boolean;
  connectStatus: ConnectStatus;
}
