import { createSlice } from '@reduxjs/toolkit';
import { IKuvoState } from './types';
import { fetchKuvoDataThunk } from './operations';

export const initialState: IKuvoState = {
  enableAutoRefresh: false,
  isConnected: false,
  playlistId: 0,
  trackData: null,
};

const kuvoSlice = createSlice({
  name: 'kuvo',
  initialState,
  reducers: {
    dummy: ((state, action) => {})
  },
  extraReducers: builder => {
    builder.addCase(fetchKuvoDataThunk.fulfilled, (state, action) => {
      return {
        ...state,
        trackData: action.payload,
      }
    });
  },
});

export default kuvoSlice;
