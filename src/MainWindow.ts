import { app, BrowserWindow, Menu, shell } from "electron";
import Store from "electron-store";

const urlPrefix = "https://music.apple.com/";
const locale = app.getLocaleCountryCode().toLowerCase();
const urlSuffix = "/browse?l=";
const language = app.getPreferredSystemLanguages()[0];
const appUrl = urlPrefix + locale + urlSuffix + language;

const WIN_BOUNDS_KEY = "winBounds";

export default class MainWindow {

    private store = new Store();
    private win!: BrowserWindow;
    private isDone = false;

    create() {
        this.win = new BrowserWindow({
            width: 800,
            height: 600,
            show: false,
            webPreferences: {
                plugins: true
            }
        });

        Menu.setApplicationMenu(null);
        this.setBounds();

        // Click to external browser
        this.win.webContents.setWindowOpenHandler(({ url }) => {
            console.log(`url=${url}`);

            if (url.includes("music.apple.com")) {
                return { action: 'allow' };
            }

            shell.openExternal(url);
            return { action: 'deny' };
        });

        this.win.once('ready-to-show', this.win.show);

        this.win.on('close', event => {
            if (this.isDone) {
                return;
            }

            event.preventDefault();
            this.hide();
        });

        this.win.loadURL(appUrl);
    }

    isVisible(): boolean {
        return this.win.isVisible();
    }

    toggle() {
        if (this.isVisible()) {
            this.hide();
        } else {
            this.show();
        }
    }

    show() {
        this.win.show();
    }

    hide() {
        this.saveBounds();
        this.win.hide();
    }

    quit() {
        this.isDone = true;
        this.saveBounds();
        app.quit();
    }

    private setBounds() {
        const bounds = this.store.get(WIN_BOUNDS_KEY);
        if (bounds != undefined) {
            this.win.setBounds(bounds);
        }
    }

    private saveBounds() {
        const bounds = this.win.getBounds();
        this.store.set(WIN_BOUNDS_KEY, bounds);
    }
}
