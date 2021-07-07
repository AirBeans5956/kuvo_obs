export interface KuvoTrack {
  title: string;
  artist: string;
}

export type LampStatus = 'fine' | 'warning' | 'danger' | 'initial';
export type ConnectStatus = 'idle' | 'connecting' | 'success' | 'disconnected' | 'failed';
