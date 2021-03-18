"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = require("../../../objects/Task");
const OpenItem = {
    name: "Create New Task",
    identifier: "CreateNewTask",
    parameters: [],
    action() {
        Task_1.default.newTask();
    }
};
exports.default = OpenItem;
