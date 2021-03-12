import "Electron";
export default abstract class BaseModal {
    constructor(templateName: string);
    private htmlFilePath;
    private win;
    getWindow(): Electron.BrowserWindow;
    open(): void;
    close(): void;
}
