/* eslint-disable import/no-extraneous-dependencies */
import {
  app,
  BrowserWindow,
  globalShortcut,
} from 'electron'; // eslint-disable-line
// const electron = require('electron');
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\') // eslint-disable-line
}

let mainWindow;
const winURL = process.env.NODE_ENV === 'development' ?
  'http://localhost:9081' :
  `file://${__dirname}/index.html`;

function createWindow() {
  /**
   * Initial window options
   */
  // globalShortcut.unregisterAll();
  // globalShortcut.register('Option+S', () => {
  //   // Do stuff when Y and either Command/Control is pressed.
  //   mainWindow.webContents.send('main-process-messages', 'save');
  // });
  mainWindow = new BrowserWindow({
    height: 600,
    useContentSize: true,
    width: 1000,
  });
  mainWindow.loadURL(winURL);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  mainWindow.webContents.openDevTools();
}

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
app.on('will-quit', () => {
  // 注销快捷键

  // 注销所有快捷键
  globalShortcut.unregisterAll();
});
/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
