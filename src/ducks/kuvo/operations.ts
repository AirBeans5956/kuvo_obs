import { createAsyncThunk } from '@reduxjs/toolkit';
import '../../core/ICore';
import { KuvoTrack } from '../../types/kuvo_obs';

export const fetchKuvoDataThunk = createAsyncThunk<
  KuvoTrack|null,
  number
>(
  'kuvo/fetchTrack',
  async (playlistId, thunkApi): Promise<KuvoTrack|null> => {
    const trackData = await window.kuvo_obs.fetchTrackData(playlistId);
    await window.kuvo_obs.showTrackData(trackData);
    return trackData;
  }
)
