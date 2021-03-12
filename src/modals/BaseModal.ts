import { prodPath } from "../Tools";
import "Electron";

export default abstract class BaseModal {
  constructor(templateName: string) {
    this.htmlFilePath = prodPath(`src/modals/${templateName}/${templateName}.html`);
    console.log(this.htmlFilePath);
    
  }

  private htmlFilePath: string;
  private win: Electron.BrowserWindow;

  getWindow() {
    return this.win ?? null;
  }

  open() {
    this.win = new Electron.remote.BrowserWindow({
      modal: true,
      parent: Electron.remote.getCurrentWindow(),
      width: 500,
      height: 400,
      // resizable: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
      autoHideMenuBar: true,
      alwaysOnTop: true,
      darkTheme: true,
      fullscreenable: false,
      frame: false,
      transparent: true
    });

    this.win.on("closed", () => {
      this.win = null;
    });

    this.win.loadFile(this.htmlFilePath);
  }

  close() {
    if (this.win) {
      this.win.close();
    }
  }
}