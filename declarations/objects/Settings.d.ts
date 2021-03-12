import Mappable from "./Mappable";
export default class Settings extends Mappable<SettingsObject> {
    constructor();
    mapFrom(keyPairs: Partial<SettingsObject>): this;
    settings: SettingsObject;
    toJSON(): SettingsObject;
    /**
     * Sync saving.
     */
    save(): boolean;
    createFolder(): void;
    /**
     * Loads the settings file into `this.settings`.
     */
    load(): boolean;
    private _queuedSave;
    private _saving;
    private filePath;
}
interface SettingsObject {
    tasksStorage: string;
}
export {};
