"use strict";
// import TaskActionStartProgram from "./actions/StartProgram";
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskActionParameters = exports.TaskActionEnum = void 0;
var TaskActionEnum;
(function (TaskActionEnum) {
    TaskActionEnum["None"] = "";
    TaskActionEnum["Custom"] = "Custom";
    TaskActionEnum["OpenWeb"] = "OpenWeb";
    TaskActionEnum["OpenItem"] = "OpenItem";
})(TaskActionEnum = exports.TaskActionEnum || (exports.TaskActionEnum = {}));
exports.taskActionParameters = {
    [TaskActionEnum.OpenItem]: [{
            name: "Folder path",
            type: "text",
            inputId: "path"
        }],
    [TaskActionEnum.OpenWeb]: [
        {
            name: "URL to open",
            type: "text",
            inputId: "url",
            defaultValue: "https://"
        }
    ]
};
