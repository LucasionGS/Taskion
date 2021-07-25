import { prodPath } from "../Tools";
import * as Electron from "electron";

export default class BaseModal {
  constructor(templateName: string, isRawHtml?: boolean, windowOptions?: Electron.BrowserWindowConstructorOptions);
  constructor(html: string, isRawHtml: true, windowOptions?: Electron.BrowserWindowConstructorOptions);
  constructor(templateName: string, isRawHtml: boolean = false, windowOptions?: Electron.BrowserWindowConstructorOptions) {
    if (!isRawHtml) this.htmlFilePath = prodPath(`src/modals/${templateName}/${templateName}.html`);
    else this.htmlRaw = templateName;

    if (windowOptions) {
      this.windowOptionsOverride = Object.assign(this.windowOptionsOverride, windowOptions);
    }
  }

  private htmlFilePath: string;
  private htmlRaw: string;
  private win: Electron.BrowserWindow;
  private windowOptionsOverride: Electron.BrowserWindowConstructorOptions = {
    modal: true,
    parent: Electron.remote.getCurrentWindow(),
    width: 500,
    height: 400,
    // resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
    autoHideMenuBar: true,
    alwaysOnTop: true,
    darkTheme: true,
    fullscreenable: false,
    frame: false,
    transparent: true
  };

  getWindow() {
    return this.win ?? null;
  }

  open(onClose?: () => void) {
    this.win = new Electron.remote.BrowserWindow(this.windowOptionsOverride);

    this.win.on("closed", () => {
      this.win = null;
      typeof onClose === "function" && onClose();
    });

    if (this.htmlFilePath) this.win.loadFile(this.htmlFilePath);
    else if (this.htmlRaw) this.win.loadURL(`data:text/html,${this.htmlRaw}`);
    return this.win;
  }

  close() {
    if (this.win) {
      this.win.close();
    }
  }


}