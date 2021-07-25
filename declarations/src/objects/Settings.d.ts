export default class Settings {
    constructor();
    setItems(settings: Partial<SettingsObject>): SettingsObject;
    private settings;
    /**
     * Set an item in settings
     * @returns
     */
    setItem<T extends keyof SettingsObject>(item: T, value: SettingsObject[T]): SettingsObject;
    getItem<T extends keyof SettingsObject>(item: T): SettingsObject[T];
    toJSON(): SettingsObject;
    /**
     * Sync saving.
     */
    private save;
    createFolder(): void;
    /**
     * Loads the settings file into `this.settings`.
     */
    private load;
    private _queuedSave;
    private _saving;
    private filePath;
}
interface SettingsObject {
    hideOnBlur: boolean;
}
export {};
