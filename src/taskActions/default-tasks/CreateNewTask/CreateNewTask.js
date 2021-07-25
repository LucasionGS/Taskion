"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Task_1 = __importDefault(require("../../../objects/Task"));
const CreateNewTask = {
    name: "Create New Task",
    identifier: "CreateNewTask",
    parameters: [],
    action() {
        Task_1.default.newTask();
    }
};
exports.default = CreateNewTask;
