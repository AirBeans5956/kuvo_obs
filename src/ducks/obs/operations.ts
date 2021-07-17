import { createAsyncThunk } from '@reduxjs/toolkit';
import { StoreState } from '../store';
import '../../core/ICore';

export interface IObsConnectParam {
  port: number;
  password: string;
}

export const connectObsThunk = createAsyncThunk<
  boolean,
  IObsConnectParam
  >(
  'obs/connect',
  async (conn, thunkAPI): Promise<boolean> => {
    return await window.kuvo_obs.connectObs(conn.port, conn.password);
  }
)

export const disconnectObsThunk = createAsyncThunk<
  boolean,
  void
  >(
  'obs/disconnect',
  async (thunkAPI): Promise<boolean> => {
    return await window.kuvo_obs.disconnectObs();
  }
)
