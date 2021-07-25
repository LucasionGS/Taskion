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
const fs = __importStar(require("fs"));
const os = __importStar(require("os"));
const Path = __importStar(require("path"));
const fsp = fs.promises;
class Settings {
    constructor() {
        this.settings = {
            hideOnBlur: false
        };
        this._queuedSave = false;
        this._saving = false;
        this.filePath = Path.resolve(os.homedir(), ".taskion", "settings.json");
        this.load();
    }
    setItems(settings) {
        let s = this.load();
        for (const key in settings) {
            if (Object.prototype.hasOwnProperty.call(settings, key)) {
                const v = settings[key];
                s[key] = v;
            }
        }
        this.save(s);
        return s;
    }
    /**
     * Set an item in settings
     * @returns
     */
    setItem(item, value) {
        let s = this.load();
        s[item] = value;
        this.save(s);
        return s;
    }
    getItem(item) {
        let s = this.load();
        return s[item];
    }
    toJSON() {
        return this.settings;
    }
    /**
     * Sync saving.
     */
    save(settings) {
        this.createFolder();
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(settings));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    createFolder() {
        if (!fs.existsSync(Path.dirname(this.filePath))) {
            fs.mkdirSync(Path.dirname(this.filePath), { recursive: true });
        }
    }
    /**
     * Loads the settings file into `this.settings`.
     */
    load() {
        try {
            return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
exports.default = Settings;
