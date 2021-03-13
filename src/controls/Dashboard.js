"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../objects/Task");
class Dashboard {
    constructor() {
        this.taskContainer = document.getElementById("task-container");
        this.controlPanel = {
            addNewTask: document.getElementById("add-new-task"),
        };
        // Initialize
    }
    addEventsToButtons() {
        this.controlPanel.addNewTask.addEventListener("click", () => {
            Task_1.default.newTask();
        });
        // this.controlPanel.toggleHideOnBlur.addEventListener("click", () => {
        //   let s = new Settings();
        // });
    }
    setTasks(tasks) {
        this.taskContainer.innerHTML = "";
        this.taskContainer.append(...tasks.map(t => t.element));
    }
    getTasks() {
        return Task_1.default.getCurrentTasks();
    }
}
exports.default = Dashboard;
