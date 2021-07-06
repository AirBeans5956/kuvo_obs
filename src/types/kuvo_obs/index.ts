export interface KuvoTrack {
  title: string;
  artist: string;
}

export type LampStatus = 'fine' | 'warning' | 'danger' | 'initial';
export type ObsConnectStatus = 'idle' | 'connecting' | 'success' | 'failed';
