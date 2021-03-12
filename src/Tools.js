"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prodPath = void 0;
const Path = require("path");
const Electron = require("electron");
function prodPath(pathToFile) {
    if ((Electron.remote || Electron).app.isPackaged) {
        return Path.resolve("./resources/app", pathToFile);
    }
    else {
        return Path.resolve(pathToFile);
    }
}
exports.prodPath = prodPath;
