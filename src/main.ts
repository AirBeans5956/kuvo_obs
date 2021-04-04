import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = (): void => {
  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      contextIsolation: true,
      preload: path.join(__dirname, '/core/preload.js'),
    },
  });

  window.webContents.openDevTools();
  window.loadFile('./index.html');
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
