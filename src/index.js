const { app, BrowserWindow, globalShortcut, ipcMain } = require('electron');
const path = require('path');
let showApp = true;
// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 500,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true,
    },
    frame: false,    
    transparent: true,
    hasShadow: false,
    fullscreenable: false,
    resizable: false,
    minimizable: false,
    maximizable: false,
    skipTaskbar: true
  });
  mainWindow.loadFile(path.join(__dirname, 'index.html'));    
  // mainWindow.webContents.openDevTools();  

  mainWindow.removeMenu();
  
  /*mainWindow.on('blur', () => {
    showHideWindow();
  });*/

  globalShortcut.register('Alt+Space', () => {
    showHideWindow();
  })
  globalShortcut.register('Ctrl+Q', () => {
    app.quit();
  })
  globalShortcut.register("Ctrl+F12", () => {
    mainWindow.webContents.toggleDevTools();
  });

  ipcMain.on('toggleWindow', (event, arg) => showHideWindow());

  const showHideWindow = ()=>{
    showApp = !showApp;
    if (showApp) {
      mainWindow.show();
    }else{
      mainWindow.hide();
    }
  }
};

app.on('ready', createWindow);

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


