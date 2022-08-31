const { app, BrowserWindow, Menu, ipcMain, nativeTheme } = require("electron")

app.name = "Countdown Desktop"

const template = [
  { role: "appMenu" }
]

const menu = Menu.buildFromTemplate(template)

function createWindow() {
  const win = new BrowserWindow({
    height: 300,
    width: 500,
    icon: "./assets/icon.png",
    titleBarStyle: "hidden",
    transparent: true
  })
  win.loadFile("./index.html")
  Menu.setApplicationMenu(menu)
}

ipcMain.handle("datk-mode:toggle", () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = "light"
  } else {
    nativeTheme.themeSource = "dark"
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle("dark-mode:system", () => {
  nativeTheme.themeSource = "system"
})

app.whenReady().then(() => {
  createWindow()
})

app.on("activate", () => {
  if (!BrowserWindow.getAllWindows().length) {
    createWindow()
  }
})

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit()
  }
})
