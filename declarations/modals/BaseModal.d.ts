import "electron";
export default abstract class BaseModal {
    constructor(templateName: string);
    private htmlFilePath;
    private win;
    getWindow(): Electron.BrowserWindow;
    open(onClose?: () => void): void;
    close(): void;
}
