import * as Electron from "electron";
import * as cp from "child_process";
import * as os from "os";
import Task from "../objects/Task";
import { TaskActionParameter } from "./iTaskAction";

const shell = Electron.remote.shell;

/**
 * Enum value of Task Action Types
 */
export enum TaskActionType {
  None = "",
  OpenItem = "OpenItem",
  OpenWeb = "OpenWeb",
  Command = "Command",

  CreateNewTask = "CreateNewTask",
}

export function taskActionName(tae: TaskActionType) {
  switch (tae) {
    case TaskActionType.None: return "None";
    case TaskActionType.OpenItem: return "Open Item";
    case TaskActionType.OpenWeb: return "Open Website";
    case TaskActionType.Command: return "Command line";
    
    case TaskActionType.CreateNewTask: return "Create New Task";
    default: return null;
  }
}

export const taskActionParameters: {[key: string]: TaskActionParameter[]} = {
  [TaskActionType.OpenItem]: [{
    name: "File/Folder path",
    type: "text",
    inputId: "path"
  }],
  [TaskActionType.OpenWeb]: [
    {
      name: "URL (Opens in default browser)",
      type: "text",
      inputId: "url",
      defaultValue: "https://"
    }
  ],
  [TaskActionType.Command]: [
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
  ]
}


export namespace TaskActions {
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
  
  export function CreateNewTask() {
    Task.newTask();
  }

  export function Command({
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