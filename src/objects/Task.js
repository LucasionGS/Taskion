"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const Mappable_1 = require("./Mappable");
const ModalNewTask_1 = require("../modals/newTask/ModalNewTask");
const taskAction_1 = require("../taskActions/taskAction");
const os = require("os");
const Path = require("path");
const Settings_1 = require("./Settings");
const fs_1 = require("fs");
const Dashboard_1 = require("../controls/Dashboard");
;
class Task extends Mappable_1.default {
    constructor() {
        super();
        this.onContextMenu = function (e) {
            e.preventDefault();
            let self = this;
            let allTasks = Task.getCurrentTasks();
            let taskIndex = allTasks.findIndex(t => t == self);
            let menu = Electron.remote.Menu.buildFromTemplate([
                {
                    label: "Move left <=",
                    click() {
                        const dashboard = new Dashboard_1.default();
                        let other = allTasks[taskIndex - 1];
                        allTasks[taskIndex - 1] = self;
                        allTasks[taskIndex] = other;
                        Task.saveTasks(allTasks);
                        dashboard.setTasks(allTasks);
                    },
                    enabled: taskIndex > 0,
                },
                {
                    label: "Move right =>",
                    click() {
                        const dashboard = new Dashboard_1.default();
                        let other = allTasks[taskIndex + 1];
                        allTasks[taskIndex + 1] = self;
                        allTasks[taskIndex] = other;
                        Task.saveTasks(allTasks);
                        dashboard.setTasks(allTasks);
                    },
                    enabled: allTasks.length - 1 > taskIndex,
                },
                {
                    label: "Delete",
                    click() {
                        let tasks = Task.getCurrentTasks();
                        let index = tasks.findIndex(t => t === self);
                        if (index > -1) {
                            tasks.splice(index, 1);
                            Task.saveTasks(tasks);
                            new Dashboard_1.default().setTasks(tasks);
                        }
                    }
                },
            ]);
            menu.popup();
        };
        this.parameters = {};
        this.taskType = taskAction_1.TaskActionType.None;
        this.element = document.createElement("div");
        this.element.className = "task-icon";
        this.element.task = this;
        this.iconElement = document.createElement("img");
        this.element.appendChild(this.iconElement);
        this.element.addEventListener("click", e => typeof this.onClick === "function" ? this.onClick.bind(this)(e) : null);
        this.element.addEventListener("contextmenu", e => typeof this.onContextMenu === "function" ? this.onContextMenu.bind(this)(e) : null);
    }
    get icon() {
        let src = this.iconElement.src;
        if (src.startsWith("file:///"))
            src = src.substring("file:///".length);
        return src;
    }
    set icon(v) {
        this.iconElement.src = v;
    }
    set description(v) {
        this.element.title = v;
    }
    get description() {
        return this.element.title;
    }
    mapFrom(task) {
        this.description = task.description;
        this.icon = task.icon;
        this.parameters = task.parameters;
        this.taskType = task.taskType;
        this.onClick = (e) => __awaiter(this, void 0, void 0, function* () {
            let action;
            let customPrefix = "custom:";
            if (task.taskType.startsWith(customPrefix)) {
                let path = task.taskType.substring(customPrefix.length);
                let cTask = (yield Promise.resolve().then(() => require(path))).default;
                action = cTask.action;
            }
            else {
                action = taskAction_1.TaskActions[task.taskType];
            }
            if (typeof action === "function")
                action(task.parameters);
        });
        return this;
    }
    static getCustomTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = JSON.parse(fs_1.readFileSync(Task.customTasksPath, "utf8"));
                let iTasks = yield Promise.all(list.map((path) => __awaiter(this, void 0, void 0, function* () {
                    let iTask = (yield Promise.resolve().then(() => require(path))).default;
                    iTask.ref = path;
                    return iTask;
                })));
                return iTasks;
            }
            catch (error) {
                return [];
            }
        });
    }
    toJSON() {
        return {
            icon: this.icon,
            description: this.description,
            parameters: this.parameters,
            taskType: this.taskType,
        };
    }
    static getTasks() {
        try {
            let tasks = [];
            let iTasks = JSON.parse(fs_1.readFileSync(Task.tasksPath, "utf8"));
            tasks = iTasks.map(t => new Task().mapFrom(t));
            return tasks;
        }
        catch (error) {
            return [];
        }
    }
    ;
    static saveTasks(tasks) {
        new Settings_1.default().createFolder();
        fs_1.writeFileSync(Task.tasksPath, JSON.stringify(tasks.map(t => t.toJSON())));
    }
    static getCurrentTasks() {
        return [...document.querySelectorAll(".task-icon")].map(e => e.task);
    }
    static newTask() {
        let modal = new ModalNewTask_1.default();
        modal.open(() => {
            let dashboard = new Dashboard_1.default();
            dashboard.setTasks(Task.getTasks());
            let win = Electron.remote.getCurrentWindow();
            win.show();
        });
    }
}
exports.default = Task;
Task.tasksPath = Path.resolve(os.homedir(), ".taskion", "tasks.json");
Task.customTasksPath = Path.resolve(os.homedir(), ".taskion", "customTasks.json");
