import * as Path from "path";
import * as Electron from "electron";

export function prodPath(pathToFile: string) {
  if ((Electron.remote || Electron).app.isPackaged) {
    return Path.resolve("./resources/app", pathToFile);
  }
  else {
    return Path.resolve(pathToFile);
  }
}

