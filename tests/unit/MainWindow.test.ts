import { describe, expect, it } from '@jest/globals';
import MainWindow from '../../app/MainWindow';

jest.mock('electron', () => {
    const mockApp = {
        getLocaleCountryCode: jest.fn(() => 'US'),
        getPreferredSystemLanguages: jest.fn(() => ['en'])
    };
    return { app: mockApp };
});

const mainWindow = new MainWindow();

describe('getAppUrl', () => {

    const appUrl = mainWindow.getAppUrl();

    it('should return the application url', () => {
        expect(appUrl).toBe('https://music.apple.com/us/browse?l=en');
    });
});
