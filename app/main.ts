import { app, BrowserWindow, components } from 'electron';
import MainWindow from './MainWindow';
import TrayMenu from './TrayMenu';

const mainWindow = new MainWindow();
const trayMenu = new TrayMenu(mainWindow);

app.whenReady().then(async () => {
    await components.whenReady();
    mainWindow.create();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            mainWindow.create();
        }
    });

    trayMenu.create();
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
