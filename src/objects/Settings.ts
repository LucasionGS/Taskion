import Mappable from "./Mappable";
import * as fs from "fs";
import * as os from "os";
import * as Path from "path";
const fsp = fs.promises;

export default class Settings {
  constructor() {
    this.load();
  }
  

  public setItems(settings: Partial<SettingsObject>) {
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

  private settings: SettingsObject = {
    hideOnBlur: false
  }

  /**
   * Set an item in settings 
   * @returns 
   */
  public setItem<T extends keyof SettingsObject>(item: T, value: SettingsObject[T]) {
    let s = this.load();
    s[item] = value;
    this.save(s);
    return s;
  }
  
  public getItem<T extends keyof SettingsObject>(item: T): SettingsObject[T] {
    let s = this.load();
    return s[item];
  }

  toJSON() {
    return this.settings;
  }
  
  /**
   * Sync saving.
   */
   private save(settings: SettingsObject): boolean {
    this.createFolder();
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(settings));
      return true;
    } catch (error) {
      return false;
    }
  }

  public createFolder() {
    if (!fs.existsSync(Path.dirname(this.filePath))) {
      fs.mkdirSync(Path.dirname(this.filePath), { recursive: true });
    }
  }

  /**
   * Loads the settings file into `this.settings`.
   */
  private load(): SettingsObject {
    try {
      return JSON.parse(fs.readFileSync(this.filePath, "utf8"));
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  private _queuedSave: boolean = false;
  private _saving: boolean = false;
  private filePath: string = Path.resolve(os.homedir(), ".taskion", "settings.json");
}

interface SettingsObject {
  hideOnBlur: boolean
}