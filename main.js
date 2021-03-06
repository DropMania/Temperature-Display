const {app, BrowserWindow,screen,ipcMain} = require('electron')
const path = require('path')
var AutoLaunch = require('auto-launch');
const SerialPort = require('serialport')
const Readline = require('@serialport/parser-readline')
const port = new SerialPort('COM3')
const parser = port.pipe(new Readline({ delimiter: '\r\n' }))



var autoLauncher = new AutoLaunch({
    name: "tempDisplay"
});

autoLauncher.isEnabled().then(function(isEnabled) {
  if (isEnabled) return;
   autoLauncher.enable();
}).catch(function (err) {
  throw err;
});


function createWindow () {
  const mainWindow = new BrowserWindow({
    width: 200,
    height: 150,
    maximizable: false,
    autoHideMenuBar: true,
    transparent: true,
    alwaysOnTop: true,
    frame: false,
    skipTaskbar: true,
		focusable: false,
    webPreferences:{
      nodeIntegration: true
    },
    icon:__dirname + '/icon.png',
    x: screen.getPrimaryDisplay().bounds.width * 2 - 180,
    y: 0
  })
  mainWindow.setIgnoreMouseEvents(true)
  mainWindow.loadFile('index.html')
  parser.on('data', (data) => {
    mainWindow.webContents.send('data',data)
  })
}

app.whenReady().then(() => {
  createWindow()
  
  
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
