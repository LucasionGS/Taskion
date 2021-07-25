import { prodPath } from "../Tools";
import "electron";

export default abstract class BaseModal {
  constructor(templateName: string) {
    this.htmlFilePath = prodPath(`src/modals/${templateName}/${templateName}.html`);
    
  }

  private htmlFilePath: string;
  private win: Electron.BrowserWindow;

  getWindow() {
    return this.win ?? null;
  }

  open(onClose?: () => void) {
    this.win = new Electron.remote.BrowserWindow({
      modal: true,
      parent: Electron.remote.getCurrentWindow(),
      width: 500,
      height: 400,
      // resizable: false,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true,
        
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
      typeof onClose === "function" && onClose();
    });

    this.win.loadFile(this.htmlFilePath);

    return this.win;
  }

  close() {
    if (this.win) {
      this.win.close();
    }
  }


}