"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const os = require("os");
const Path = require("path");
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
