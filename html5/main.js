const { app, BrowserWindow, webFrame } = require("electron");
const path = require("path");
const url = require("url");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;

function createWindow() {
  const electron = require("electron");

  let tallestDisplay = null;
  for (let display of electron.screen.getAllDisplays()) {
    if (
      !tallestDisplay ||
      tallestDisplay.workArea.height < display.workArea.height
    ) {
      tallestDisplay = display;
    }
  }

  function getGoodWindowBounds(display) {
    let height = display.workArea.height;
    if (electron.screen.getMenuBarHeight != null) {
      height -= electron.screen.getMenuBarHeight();
    }

    // Many macOS apps seem to leave a couple pixels
    // below a full-screen window, to convince the user the window terminates.
    height -= 2;

    let width = Math.ceil(height * 9 / 16);
    let x =
      display.workArea.x + Math.round(display.workArea.width / 2 - width / 2);
    let y = display.workArea.y;

    return { x, y, width, height };
  }

  let initBounds = getGoodWindowBounds(tallestDisplay);

  // Create the browser window.
  win = new BrowserWindow({
    x: initBounds.x,
    y: initBounds.y,
    width: initBounds.width,
    height: initBounds.height,
    backgroundColor: "#000000",
    resizable: false,
    fullscreenable: false,
    maximizable: false,
    autoHideMenuBar: true,
    icon: __dirname + "/icon.ico"
  });

  win.setContentSize(initBounds.width, initBounds.height);

  win.loadURL(`file://${__dirname}/index.html`);

  // Open the DevTools.
  // win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  win.on("move", () => {
    let bounds = getGoodWindowBounds(
      electron.screen.getDisplayMatching(win.getBounds())
    );
    win.setContentSize(bounds.width, bounds.height);
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  app.quit();
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  } else {
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
