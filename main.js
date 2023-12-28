import { app, BrowserWindow, components } from 'electron';
import MainWindow from './MainWindow.js';

app.whenReady().then(async () => {
    await components.whenReady();
    new MainWindow().create();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            new MainWindow().create();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
