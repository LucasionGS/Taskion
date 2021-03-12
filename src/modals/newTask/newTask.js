"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = require("../../Header");
const Task_1 = require("../../objects/Task");
const Electron = require("electron");
const taskAction_1 = require("../../taskActions/taskAction");
Header_1.default.setup();
const task = new Task_1.default();
task.taskType = taskAction_1.TaskActionEnum.None;
let extraValues = {};
function selectFile() {
    let files = Electron.remote.dialog.showOpenDialogSync(Electron.remote.getCurrentWindow(), {
        filters: [
            {
                name: "Task icon",
                extensions: [
                    "png",
                    "jpg",
                    "jpeg",
                    "gif",
                ]
            }
        ],
    });
    if (!files || !files[0])
        return;
    let file = (files && files[0]);
    document.getElementById('filename_display').value = task.icon = file;
}
function onTypeChange(type) {
    var _a;
    task.taskType = type;
    let data = parametersToInputs((_a = taskAction_1.taskActionParameters[task.taskType]) !== null && _a !== void 0 ? _a : []);
    extraValues = data.values;
    let extraParameters = document.getElementById("extra-parameters");
    extraParameters.innerHTML = "";
    extraParameters.append(...data.elements);
}
function parametersToInputs(params) {
    let data = {
        elements: [],
        values: {}
    };
    params.forEach(p => {
        const inputName = document.createElement("label");
        inputName.innerText = p.name;
        const input = document.createElement("input");
        input.type = p.type;
        input.addEventListener("change", () => {
            data.values[p.inputId] = p.type === "number" ? input.valueAsNumber : input.value;
        });
        if (typeof p.defaultValue !== "undefined") {
            data.values[p.inputId] = input.value = p.defaultValue + "";
        }
        data.elements.push(inputName, input, document.createElement("br"));
    });
    return data;
}
function createTask() {
    let taskData = {
        description: task.description,
        icon: task.icon,
        parameters: extraValues,
        taskType: task.taskType
    };
    task.mapFrom(taskData);
    let tasks = Task_1.default.getTasks();
    tasks.push(task);
    Task_1.default.saveTasks(tasks);
    Electron.remote.getCurrentWindow().close();
}
