import { app, BrowserWindow, Menu, shell } from "electron";
import Store from "electron-store";

const urlPrefix = "https://music.apple.com/";
const locale = app.getLocaleCountryCode().toLowerCase();
const urlSuffix = "/browse?l=";
const language = app.getPreferredSystemLanguages()[0];
const appUrl = urlPrefix + locale + urlSuffix + language;

const WIN_BOUNDS_KEY = "winBounds";

export default class MainWindow {

    #store = new Store();

    #win = new BrowserWindow({
        width: 800,
        height: 600,
        show: false,
        webPreferences: {
            plugins: true
        }
    });

    create() {
        Menu.setApplicationMenu(null);
        this.#setBounds();

        // Click to external browser
        this.#win.webContents.setWindowOpenHandler(({ url }) => {
            console.log(`url=${url}`);

            if (url.includes("music.apple.com")) {
                return { action: 'allow' };
            }

            shell.openExternal(url);
            return { action: 'deny' };
        });

        this.#win.once('ready-to-show', this.#win.show);

        this.#win.loadURL(appUrl);

        this.#win.on('close', () => {
            this.#saveBounds();
        });
    }

    #setBounds() {
        const bounds = this.#store.get(WIN_BOUNDS_KEY);
        if (bounds != undefined) {
            this.#win.setBounds(bounds);
        }
    }

    #saveBounds() {
        const bounds = this.#win.getBounds();
        this.#store.set(WIN_BOUNDS_KEY, bounds);
    }
}
