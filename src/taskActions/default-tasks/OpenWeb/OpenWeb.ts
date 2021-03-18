import { shell } from "electron";
import { ITaskBuildInTemplate } from "../../iTaskAction";

const OpenItem: ITaskBuildInTemplate = {
  name: "Open Web",
  identifier: "OpenWeb",
  parameters: [
    {
      name: "URL (Opens in default browser)",
      type: "text",
      inputId: "url",
      defaultValue: "https://"
    }
  ],
  action(
    {
      url
    } : {
      url: string
    }) {
    shell.openExternal(url);
  }
}
export default OpenItem;