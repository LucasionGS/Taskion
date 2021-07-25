import CreateNewTask from "./default-tasks/CreateNewTask/CreateNewTask";
import OpenItem from "./default-tasks/OpenItem/OpenItem";
import OpenWeb from "./default-tasks/OpenWeb/OpenWeb";
import Command from "./default-tasks/Command/Command";
import HTTPRequest from "./default-tasks/HTTPRequest/HTTPRequest";
import { ITaskBuildInTemplate } from "./iTaskAction";

const tasks: {[name: string]: ITaskBuildInTemplate} =
{
  CreateNewTask,
  OpenItem,
  OpenWeb,
  Command,
  HTTPRequest,
}
export default tasks;