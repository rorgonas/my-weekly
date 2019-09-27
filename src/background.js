import {
  app, protocol, BrowserWindow, Menu, systemPreferences, ipcMain, shell, remote,
} from 'electron';
import { createProtocol, installVueDevtools } from 'vue-cli-plugin-electron-builder/lib';

const isDevelopment = process.env.NODE_ENV !== 'production';
const fs = require('fs');
const path = require('path');

// Hide extra native sub menu items
systemPreferences.setUserDefault('NSDisabledDictationMenuItem', 'boolean', true);
systemPreferences.setUserDefault('NSDisabledCharacterPaletteMenuItem', 'boolean', true);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let aboutWin;

const mainMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Issues List',
        accelerator: process.platform === 'darwin' ? 'Command+L' : 'Ctrl+L',
        click() {
          win.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/issues`);
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Close Project',
        accelerator: process.platform === 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit();
        },
      },
    ],
  },
  {
    label: 'Edit',
    submenu: [
      { label: 'Copy', accelerator: 'CmdOrCtrl+C', selector: 'copy:' },
      { label: 'Paste', accelerator: 'CmdOrCtrl+V', selector: 'paste:' },
    ],
  },
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.reload();
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'Ctrl+Shift+I',
        click(item, focusedWindow) {
          if (focusedWindow) focusedWindow.webContents.toggleDevTools();
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'togglefullscreen',
      },
    ],
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Learn Electron',
        click() {
          shell.openExternal('http://electron.atom.io');
        },
      },
      {
        label: 'VueJS Guide',
        click() {
          shell.openExternal('https://vuejs.org/v2/guide/');
        },
      },
      {
        label: 'Vuetify Material Design Overview',
        click() {
          shell.openExternal('https://vuetifyjs.com/en/components/api-explorer');
        },
      },
    ],
  },
];

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: 'app', privileges: { secure: true, standard: true } }]);

function createWindow() {
  // Create the browser window.
  win = new BrowserWindow({
    width: 1024,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  aboutWin = new BrowserWindow({
    width: 400, height: 400, parent: win, show: false, webPreferences: { nodeIntegration: true },
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    aboutWin.loadURL(`${process.env.WEBPACK_DEV_SERVER_URL}#/about`);
    // if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    createProtocol('app');
    // Load the index.html when not in development
    win.loadURL('app://./index.html');
  }

  win.on('closed', () => {
    win = null;
  });

  aboutWin.on('close', (e) => {
    e.preventDefault();
    aboutWin.hide();
  });

  const menu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(menu);
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    // try {
    //   await installVueDevtools()
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow();
});

// Export to PDF
ipcMain.on('print-to-pdf', (event, mode) => {
  const pdfPath = path.join(__dirname, '/reports/issue.pdf');
  const sender = BrowserWindow.fromWebContents(event.sender);

  sender.webContents.printToPDF({ printBackground: true, landscape: true }, (error, data) => {
    if (error) throw error;

    // Save with a buffer as content from a base64 image
    fs.writeFile(pdfPath, new Buffer(data, 'base64'), (err) => {
      if (err) throw err;

      // download PDF
      if (mode === 'save') {
        const test = new BrowserWindow({
          width: 378,
          height: 566,
          show: true,
          webPreferences: {
            webSecurity: false,
            plugins: true,
          },
        });
        test.loadURL(`file://${__dirname}/reports/issue.pdf`);
      }

      // load PDF
      if (mode === 'open') {
        shell.openExternal(`file://${pdfPath}`);
      }
    });
  });
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

// On Mac add empty object to menu
if (process.platform === 'darwin') {
  const name = app.getName();
  mainMenuTemplate.unshift({
    label: name,
    submenu: [
      {
        label: 'About MyWeekly',
        click() {
          aboutWin.show();
        },
      },
      {
        type: 'separator',
      },
      {
        role: 'quit',
      },
    ],
  });
}
