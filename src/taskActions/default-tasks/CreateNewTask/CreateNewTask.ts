import { ITaskBuildInTemplate } from "../../iTaskAction";
import * as os from "os";
import * as cp from "child_process";
import Task from "../../../objects/Task";

const OpenItem: ITaskBuildInTemplate = {
  name: "Create New Task",
  identifier: "CreateNewTask",
  parameters: [],
  action() {
    Task.newTask();
  }
}
export default OpenItem;