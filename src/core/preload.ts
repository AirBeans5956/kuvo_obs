import { contextBridge } from 'electron';
import core from './core';

contextBridge.exposeInMainWorld('myApp', core);
contextBridge.exposeInMainWorld('kuvo_obs', core);
