import { contextBridge } from 'electron';
import core from './core';

contextBridge.exposeInMainWorld('myApp', core);
window.testFoo = 'hogehoge';
console.log('pre loaded!!');
