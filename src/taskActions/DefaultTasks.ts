import OpenItem from "./default-tasks/OpenItem/OpenItem";
import OpenWeb from "./default-tasks/OpenWeb/OpenWeb";
import Command from "./default-tasks/Command/Command";
import { ITaskBuildInTemplate } from "./iTaskAction";

const tasks: {[name: string]: ITaskBuildInTemplate} =
{
  OpenItem,
  OpenWeb,
  Command
}
export default tasks;