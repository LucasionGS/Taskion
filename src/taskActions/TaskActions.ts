import * as Electron from "electron";
import * as cp from "child_process";
const shell = Electron.remote.shell;
namespace TaskActions {
  export function OpenItem(
    {
      path
    } : {
      path: string
    }) {
    shell.openPath(path);
  }
  export function OpenWeb(
    {
      url
    } : {
      url: string
    }) {
    shell.openExternal(url);
  }
}

export default TaskActions;