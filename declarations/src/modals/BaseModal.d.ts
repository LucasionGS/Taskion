import * as Electron from "electron";
export default class BaseModal {
    constructor(templateName: string, isRawHtml?: boolean, windowOptions?: Electron.BrowserWindowConstructorOptions);
    constructor(html: string, isRawHtml: true, windowOptions?: Electron.BrowserWindowConstructorOptions);
    private htmlFilePath;
    private htmlRaw;
    private win;
    private windowOptionsOverride;
    getWindow(): Electron.BrowserWindow;
    open(onClose?: () => void): Electron.BrowserWindow;
    close(): void;
}
