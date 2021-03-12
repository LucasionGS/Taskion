"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseModal_1 = require("../BaseModal");
const path_1 = require("path");
class ModalNewTask extends BaseModal_1.default {
    constructor() {
        super(path_1.basename(__dirname));
    }
}
exports.default = ModalNewTask;
