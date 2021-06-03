const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

app.whenReady().then(function() {
    createWindow();
})

function createWindow () {
    const mainwindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences:{
          nodeIntegration:true
      }
    })
  
    mainwindow.loadFile('Website/index.html').then(function(){
        mainwindow.maximize();
        mainwindow.webContents.openDevTools;
    })
  }