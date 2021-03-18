import { shell } from "electron";
import { ITaskBuildInTemplate } from "../../iTaskAction";

const OpenItem: ITaskBuildInTemplate = {
  name: "Open Item",
  identifier: "OpenItem",
  parameters: [{
    name: "File/Folder path",
    type: "file",
    inputId: "path"
  }],
  action(
    {
      path
    } : {
      path: string
    }) {
    shell.openPath(path);
  }
}
export default OpenItem;