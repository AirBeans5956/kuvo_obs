import { createAsyncThunk } from '@reduxjs/toolkit';
import '../../core/ICore';
import { KuvoTrack } from '../../types/kuvo_obs';

export const fetchKuvoDataThunk = createAsyncThunk<
  KuvoTrack|null,
  number
>(
  'kuvo/fetchTrack',
  async (playlistId, thunkApi): Promise<KuvoTrack|null> => {
    return await window.kuvo_obs.fetchTrackData(playlistId);
  }
)
