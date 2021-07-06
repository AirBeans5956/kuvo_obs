import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IObsState } from './types';
import { connectObsThunk } from './operations';

export const initialState: IObsState = {
  isConnected: false,
  connectStatus: 'idle',
}

const obsSlice = createSlice({
  name: 'obs',
  initialState,
  reducers: {
    dummy: (state, action) => {},
  },
  extraReducers: builder => {
    builder.addCase(connectObsThunk.pending, state => {
      return {
        ...state,
        connectStatus: 'connecting',
      };
    });
    builder.addCase(connectObsThunk.fulfilled, (state, action) => {
      return {
        ...state,
        connectStatus: 'success',
      };
    });
  },
});

export default obsSlice;


