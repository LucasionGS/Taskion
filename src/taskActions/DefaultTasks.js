"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const OpenItem_1 = require("./default-tasks/OpenItem/OpenItem");
const OpenWeb_1 = require("./default-tasks/OpenWeb/OpenWeb");
const Command_1 = require("./default-tasks/Command/Command");
const tasks = {
    OpenItem: OpenItem_1.default,
    OpenWeb: OpenWeb_1.default,
    Command: Command_1.default
};
exports.default = tasks;
