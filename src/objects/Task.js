"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = require("electron");
const Mappable_1 = require("./Mappable");
const ModalNewTask_1 = require("../modals/newTask/ModalNewTask");
const taskAction_1 = require("../taskActions/taskAction");
const taskActions_1 = require("../taskActions/taskActions");
const os = require("os");
const Path = require("path");
const Settings_1 = require("./Settings");
const fs_1 = require("fs");
Electron.remote;
class Task extends Mappable_1.default {
    constructor() {
        super();
        this.onContextMenu = function () {
        };
        this.parameters = {};
        this.taskType = taskAction_1.TaskActionEnum.None;
        this.element = document.createElement("div");
        this.element.className = "task-icon";
        this.iconElement = document.createElement("img");
        this.element.appendChild(this.iconElement);
        this.element.addEventListener("click", e => typeof this.onClick === "function" ? this.onClick(e) : null);
        this.element.addEventListener("contextmenu", e => typeof this.onContextMenu === "function" ? this.onContextMenu(e) : null);
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
        this.onClick = (e) => {
            let action = taskActions_1.default[task.taskType];
            if (typeof action === "function")
                action(task.parameters);
        };
        return this;
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
    static newTask() {
        let modal = new ModalNewTask_1.default();
        modal.open();
    }
}
exports.default = Task;
Task.tasksPath = Path.resolve(os.homedir(), ".taskion", "tasks.json");
