"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = require("../Tools");
const electron_1 = __importDefault(require("electron"));
class BaseModal {
    constructor(templateName) {
        this.htmlFilePath = Tools_1.prodPath(`src/modals/${templateName}/${templateName}.html`);
    }
    getWindow() {
        var _a;
        return (_a = this.win) !== null && _a !== void 0 ? _a : null;
    }
    open(onClose) {
        this.win = new electron_1.default.remote.BrowserWindow({
            modal: true,
            parent: electron_1.default.remote.getCurrentWindow(),
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
exports.default = BaseModal;
