import { ITaskBuildInTemplate } from "../../iTaskAction";
import * as os from "os";
import * as cp from "child_process";

const OpenItem: ITaskBuildInTemplate = {
  name: "Command",
  identifier: "Command",
  parameters: [
    {
      name: "Command",
      type: "text",
      inputId: "cmd",
    },
    {
      name: "Working Directory",
      type: "text",
      inputId: "cwd",
      defaultValue: os.homedir()
    },
  ],
  action({
    cwd,
    cmd,
    showTerminal
  } : {
    cwd: string,
    cmd: string,
    showTerminal: boolean,
  }) {
    cp.exec(cmd, {
      cwd: cwd || os.homedir()
    });
  }
}
export default OpenItem;