"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CreateNewTask_1 = __importDefault(require("./default-tasks/CreateNewTask/CreateNewTask"));
const OpenItem_1 = __importDefault(require("./default-tasks/OpenItem/OpenItem"));
const OpenWeb_1 = __importDefault(require("./default-tasks/OpenWeb/OpenWeb"));
const Command_1 = __importDefault(require("./default-tasks/Command/Command"));
const HTTPRequest_1 = __importDefault(require("./default-tasks/HTTPRequest/HTTPRequest"));
const tasks = {
    CreateNewTask: CreateNewTask_1.default,
    OpenItem: OpenItem_1.default,
    OpenWeb: OpenWeb_1.default,
    Command: Command_1.default,
    HTTPRequest: HTTPRequest_1.default,
};
exports.default = tasks;
