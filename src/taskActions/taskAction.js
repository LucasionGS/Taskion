"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskActions = exports.taskActionParameters = exports.taskActionName = exports.TaskActionType = void 0;
const Electron = require("electron");
const cp = require("child_process");
const os = require("os");
const Task_1 = require("../objects/Task");
const shell = Electron.remote.shell;
/**
 * Enum value of Task Action Types
 */
var TaskActionType;
(function (TaskActionType) {
    TaskActionType["None"] = "";
    TaskActionType["OpenItem"] = "OpenItem";
    TaskActionType["OpenWeb"] = "OpenWeb";
    TaskActionType["Command"] = "Command";
    TaskActionType["CreateNewTask"] = "CreateNewTask";
})(TaskActionType = exports.TaskActionType || (exports.TaskActionType = {}));
function taskActionName(tae) {
    switch (tae) {
        case TaskActionType.None: return "None";
        case TaskActionType.OpenItem: return "Open Item";
        case TaskActionType.OpenWeb: return "Open Website";
        case TaskActionType.Command: return "Command line";
        case TaskActionType.CreateNewTask: return "Create New Task";
        default: return null;
    }
}
exports.taskActionName = taskActionName;
exports.taskActionParameters = {
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
};
var TaskActions;
(function (TaskActions) {
    function OpenItem({ path }) {
        shell.openPath(path);
    }
    TaskActions.OpenItem = OpenItem;
    function OpenWeb({ url }) {
        shell.openExternal(url);
    }
    TaskActions.OpenWeb = OpenWeb;
    function CreateNewTask() {
        Task_1.default.newTask();
    }
    TaskActions.CreateNewTask = CreateNewTask;
    function Command({ cwd, cmd, showTerminal }) {
        cp.exec(cmd, {
            cwd: cwd || os.homedir()
        });
    }
    TaskActions.Command = Command;
})(TaskActions = exports.TaskActions || (exports.TaskActions = {}));
