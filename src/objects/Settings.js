"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mappable_1 = require("./Mappable");
const fs = require("fs");
const os = require("os");
const Path = require("path");
const fsp = fs.promises;
class Settings extends Mappable_1.default {
    constructor() {
        super();
        this.settings = {
            tasksStorage: null,
        };
        this._queuedSave = false;
        this._saving = false;
        this.filePath = Path.resolve(os.homedir(), ".taskion", "settings.json");
        this.load();
    }
    mapFrom(keyPairs) {
        for (const key in keyPairs) {
            if (Object.prototype.hasOwnProperty.call(keyPairs, key)) {
                const v = keyPairs[key];
                this.settings[key] = v;
            }
        }
        return this;
    }
    toJSON() {
        return this.settings;
    }
    /**
     * Sync saving.
     */
    save() {
        this.createFolder();
        try {
            fs.writeFileSync(this.filePath, JSON.stringify(this.settings));
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
            this.settings = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
            return true;
        }
        catch (error) {
            console.error(error);
            return false;
        }
    }
}
exports.default = Settings;
