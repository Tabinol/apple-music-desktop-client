const { app, BrowserWindow } = require('electron/main')
const { components, Menu, shell } = require('electron')

const urlPrefix = "https://music.apple.com/"
const locale = app.getLocaleCountryCode().toLowerCase()
const urlSuffix = "/browse?l="
const language = app.getPreferredSystemLanguages()[0]
const appUrl = urlPrefix + locale + urlSuffix + language

const createWindow = () => {
    Menu.setApplicationMenu(null)

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            plugins: true
        }
    })

    // Click to external browser
    win.webContents.setWindowOpenHandler(({ url }) => {
        console.log(`url=${url}`)
        if (url.includes("music.apple.com")) {
            return { action: 'allow' }
        }

        shell.openExternal(url)
        return { action: 'deny' }
    });

    win.loadURL(appUrl)
}

app.whenReady().then(async () => {
    await components.whenReady()
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
