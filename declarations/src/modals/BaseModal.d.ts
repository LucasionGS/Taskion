import "Electron";
export default abstract class BaseModal {
    constructor(templateName: string);
    private htmlFilePath;
    private win;
    getWindow(): Electron.BrowserWindow;
    open(onClose?: () => void): Electron.BrowserWindow;
    close(): void;
}