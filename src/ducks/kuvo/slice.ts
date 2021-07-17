import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IKuvoState } from './types';
import { fetchKuvoDataThunk } from './operations';

export const initialState: IKuvoState = {
  enableAutoRefresh: false,
  isConnected: false,
  connectStatus: 'idle',
  playlistId: 0,
  trackData: null,
};

const kuvoSlice = createSlice({
  name: 'kuvo',
  initialState,
  reducers: {
    setPlaylistId: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        playlistId: action.payload
      }
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchKuvoDataThunk.pending, (state, action) => {
      return {
        ...state,
        isConnected: false,
        connectStatus: 'connecting',
      }
    });
    builder.addCase(fetchKuvoDataThunk.fulfilled, (state, action) => {
      return {
        ...state,
        isConnected: true,
        connectStatus: 'success',
        trackData: action.payload,
      }
    });
    builder.addCase(fetchKuvoDataThunk.rejected, state => {
      return {
        ...state,
        connectStatus: 'failed',
        isConnected: false,
      }
    })
  },
});

export const {
  setPlaylistId
} = kuvoSlice.actions;

export default kuvoSlice;
