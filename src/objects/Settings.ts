import Mappable from "./Mappable";
import * as fs from "fs";
import * as os from "os";
import * as Path from "path";
const fsp = fs.promises;

export default class Settings extends Mappable<SettingsObject> {
  constructor() {
    super();
    this.load();
  }
  

  public mapFrom(keyPairs: Partial<SettingsObject>) {
    for (const key in keyPairs) {
      if (Object.prototype.hasOwnProperty.call(keyPairs, key)) {
        const v = keyPairs[key];
        this.settings[key] = v;
      }
    }

    return this;
  }

  public settings: SettingsObject = {
    tasksStorage: null,
  }

  toJSON() {
    return this.settings;
  }
  
  /**
   * Sync saving.
   */
   public save(): boolean {
    this.createFolder();
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(this.settings));
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
  public load(): boolean {
    try {
      this.settings = JSON.parse(fs.readFileSync(this.filePath, "utf8"));
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  private _queuedSave: boolean = false;
  private _saving: boolean = false;
  private filePath: string = Path.resolve(os.homedir(), ".taskion", "settings.json");
}

interface SettingsObject {
  tasksStorage: string;
}