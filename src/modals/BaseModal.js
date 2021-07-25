"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Tools_1 = require("../Tools");
const Electron = __importStar(require("electron"));
class BaseModal {
    constructor(templateName, isRawHtml = false, windowOptions) {
        this.windowOptionsOverride = {
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
        if (!isRawHtml)
            this.htmlFilePath = Tools_1.prodPath(`src/modals/${templateName}/${templateName}.html`);
        else
            this.htmlRaw = templateName;
        if (windowOptions) {
            this.windowOptionsOverride = Object.assign(this.windowOptionsOverride, windowOptions);
        }
    }
    getWindow() {
        var _a;
        return (_a = this.win) !== null && _a !== void 0 ? _a : null;
    }
    open(onClose) {
        this.win = new Electron.remote.BrowserWindow(this.windowOptionsOverride);
        this.win.on("closed", () => {
            this.win = null;
            typeof onClose === "function" && onClose();
        });
        if (this.htmlFilePath)
            this.win.loadFile(this.htmlFilePath);
        else if (this.htmlRaw)
            this.win.loadURL(`data:text/html,${this.htmlRaw}`);
        return this.win;
    }
    close() {
        if (this.win) {
            this.win.close();
        }
    }
}
exports.default = BaseModal;
