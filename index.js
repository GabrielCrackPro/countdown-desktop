const { app, BrowserWindow, Menu } = require("electron")

app.name = "Countdown Desktop"

const isMac = process.platform == "darwin"

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: "about" },
      { type: "separator" },
      { role: "services" },
      { type: "separator" },
      { role: "hide" },
      { role: "hideOthers" },
      { role: "unhide" },
      { type: "separator" },
      { role: "quit" }
    ]
  }] : [])
]

const menu = Menu.buildFromTemplate(template)

function createWindow() {
  const win = new BrowserWindow({
    height: 300,
    width: 500,
    transparent: true,
    frame: false
  })
  win.loadFile("./index.html")
  Menu.setApplicationMenu(menu)
}

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
