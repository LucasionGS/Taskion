"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Electron = __importStar(require("electron"));
const Mappable_1 = __importDefault(require("./Mappable"));
const ModalNewTask_1 = __importDefault(require("../modals/newTask/ModalNewTask"));
const os = __importStar(require("os"));
const Path = __importStar(require("path"));
const Settings_1 = __importDefault(require("./Settings"));
const fs_1 = require("fs");
const Dashboard_1 = __importDefault(require("../controls/Dashboard"));
const DefaultTasks_1 = __importDefault(require("../taskActions/DefaultTasks"));
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
        this.onDrop = function (e) {
            // e.preventDefault();
            // e.stopPropagation();
            // console.log(e.target);
            // console.log(e.currentTarget);
            // console.log(e.relatedTarget);
        };
        this.parameters = {};
        this.taskType = null;
        this.element = document.createElement("div");
        this.element.className = "task-icon";
        this.element.draggable = true;
        this.element.task = this;
        this.iconElement = document.createElement("img");
        this.iconElement.draggable = false;
        this.element.appendChild(this.iconElement);
        this.element.addEventListener("click", e => typeof this.onClick === "function" ? this.onClick.bind(this)(e) : null);
        this.element.addEventListener("contextmenu", e => typeof this.onContextMenu === "function" ? this.onContextMenu.bind(this)(e) : null);
        this.element.addEventListener("dragstart", e => {
            Task.dragging = this;
        });
        this.element.addEventListener("dragover", e => {
            e.stopImmediatePropagation();
            e.stopPropagation();
            e.preventDefault();
            const currentTarget = e.currentTarget;
            if (Task.dragging != currentTarget.task) {
                // this.swapTaskPositions(e, Task.dragging, currentTarget.task);
                currentTarget.task.swapTaskPositions(e);
            }
        });
        this.element.addEventListener("dragend", e => {
            Task.dragging = null;
            let d = new Dashboard_1.default();
            let ts = d.getTasks();
            Task.saveTasks(ts);
        });
    }
    get parent() {
        return this.element.parentElement;
    }
    swapTaskPositions(e) {
        let w = this.element.getBoundingClientRect().width;
        let o = e.offsetX;
        let side = (w / 2) < o;
        // Move `nodeA` to before the `nodeB`
        if (side === false) {
            if (this.element.previousElementSibling !== Task.dragging.element)
                this.element.parentNode.insertBefore(Task.dragging.element, this.element);
        }
        else {
            if (this.element.nextElementSibling !== Task.dragging.element)
                this.element.parentNode.insertBefore(Task.dragging.element, this.element.nextElementSibling);
        }
        // Move `nodeB` to before the sibling of `nodeA`
        // parentA.insertBefore(taskB.element, siblingA);
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
            var _a, _b;
            let action;
            const customPrefix = "custom:";
            if (task.taskType.startsWith(customPrefix)) {
                let path = task.taskType.substring(customPrefix.length);
                let cTask = (yield Promise.resolve().then(() => __importStar(require(path)))).default;
                action = cTask.action;
            }
            else {
                action = (_b = (_a = DefaultTasks_1.default[task.taskType]) === null || _a === void 0 ? void 0 : _a.action) !== null && _b !== void 0 ? _b : (() => alert("Error"));
            }
            if (typeof action === "function")
                action(task.parameters);
        });
        return this;
    }
    static getDefaultTasks() {
        try {
            return DefaultTasks_1.default;
        }
        catch (error) {
            return {};
        }
    }
    static getCustomTasks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let list = JSON.parse(fs_1.readFileSync(Task.customTasksPath, "utf8"));
                let iTasks = yield Promise.all(list.map((path) => __awaiter(this, void 0, void 0, function* () {
                    let iTask = (yield Promise.resolve().then(() => __importStar(require(path)))).default;
                    iTask.ref = path;
                    return iTask;
                })));
                return iTasks;
            }
            catch (error) {
                console.error(error);
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
Task.dragging = null;
Task.tasksPath = Path.resolve(os.homedir(), ".taskion", "tasks.json");
Task.defaultTasksFilesPath = Path.resolve(__dirname, "..", "..", "default-tasks");
Task.customTasksPath = Path.resolve(os.homedir(), ".taskion", "customTasks.json");
