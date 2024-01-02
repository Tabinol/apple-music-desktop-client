import { describe, expect, it } from '@jest/globals';
import fs from 'fs';
import MainWindow from '../../app/MainWindow';
import TrayMenu from '../../app/TrayMenu';

jest.mock('../../app/MainWindow');
jest.mock('electron', () => {
    const mockApp = {
        isPackaged: false
    };
    return { app: mockApp };
});

const mockMainWindow = jest.mocked(MainWindow);
const trayMenu = new TrayMenu(mockMainWindow.mock.instances[0]);

describe('getIconPath', () => {

    const iconPath = trayMenu.getIconPath();

    it('should return the icon path', () => {
        expect(iconPath).toBe('images/icon.png');
    });

    it('should return the icon', () => {
        expect(fs.existsSync(iconPath)).toBeTruthy();
    });
});
