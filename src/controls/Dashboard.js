"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../objects/Task");
class Dashboard {
    constructor() {
        // Initialize
        this.taskContainer = document.getElementById("task-container");
        this.controlPanel = {
            add: document.getElementById("add-new-task"),
        };
        this.controlPanel.add.addEventListener("click", () => {
            Task_1.default.newTask();
        });
    }
    setTasks(tasks) {
        this.tasks = tasks !== null && tasks !== void 0 ? tasks : [];
        this.taskContainer.innerHTML = "";
        this.taskContainer.append(...tasks.map(t => t.element));
    }
    getTasks() {
        var _a;
        return (_a = this.tasks) !== null && _a !== void 0 ? _a : [];
    }
}
exports.default = Dashboard;
