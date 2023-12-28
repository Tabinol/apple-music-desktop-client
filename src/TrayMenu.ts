import { app, Menu, Tray } from 'electron';
import path from 'path';
import MainWindow from './MainWindow';

const TOOL_TIP = 'Apple Music';
const ICON_PATH = 'images/icon.png';

export default class TrayMenu {

    private tray!: Tray;
    private mainWindow: MainWindow;

    constructor(mainWindow: MainWindow) {
        this.mainWindow = mainWindow;
    }

    create() {
        const iconPath = app.isPackaged ? path.join(process.resourcesPath, ICON_PATH) : ICON_PATH;
        this.tray = new Tray(iconPath);

        const contextMenu = Menu.buildFromTemplate([
            { label: 'Show', click: _ => { this.mainWindow.show(); } },
            { label: 'Quit', click: _ => { this.mainWindow.quit(); } }
        ]);

        this.tray.on('click', () => {
            this.mainWindow.toggle();
        });

        this.tray.setToolTip(TOOL_TIP);
        this.tray.setContextMenu(contextMenu);
    }
}
