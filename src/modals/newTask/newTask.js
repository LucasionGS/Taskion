"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Header_1 = __importDefault(require("../../Header"));
const Task_1 = __importDefault(require("../../objects/Task"));
const Electron = __importStar(require("electron"));
const DefaultTasks_1 = __importDefault(require("../../taskActions/DefaultTasks"));
Header_1.default.setup();
const task = new Task_1.default();
task.taskType = null;
let extraValues = {};
// Add options to select type.
let taskActionTypeSelect = document.getElementById("taskActionType");
const options = [];
for (const key in DefaultTasks_1.default) {
    if (Object.prototype.hasOwnProperty.call(DefaultTasks_1.default, key)) {
        const value = DefaultTasks_1.default[key];
        const opt = document.createElement("option");
        opt.innerText = value.name;
        opt.value = value.identifier;
        options.push(opt);
        if (task.taskType === null)
            onTypeChange(DefaultTasks_1.default[key].identifier);
    }
}
taskActionTypeSelect.append(...options);
// Add custom tasks, if any.
let customTasks = Task_1.default.getCustomTasks();
customTasks.then(cTasks => {
    // Add separator
    if (cTasks.length > 0) {
        { // Add built tasks label
            const opt = document.createElement("option");
            opt.innerText = "- Built-in Tasks -";
            opt.disabled = true;
            taskActionTypeSelect.insertBefore(opt, taskActionTypeSelect.firstElementChild);
        }
        { // Add custom tasks label
            const opt = document.createElement("option");
            opt.innerText = "- Custom Tasks -";
            opt.disabled = true;
            taskActionTypeSelect.append(opt);
        }
        for (let i = 0; i < cTasks.length; i++) {
            const value = cTasks[i];
            const opt = document.createElement("option");
            opt.innerText = value.name;
            opt.value = "custom:" + value.ref;
            taskActionTypeSelect.append(opt);
        }
    }
});
function isCustom(type) {
    return type.startsWith("custom:");
}
function selectFile(filter = null) {
    let files = Electron.remote.dialog.showOpenDialogSync(Electron.remote.getCurrentWindow(), {
        filters: filter,
    });
    if (!files || !files[0])
        return;
    let file = (files && files[0]) || null;
    return file;
}
function selectImageFile() {
    return selectFile([
        {
            name: "Task icon",
            extensions: [
                "png",
                "jpg",
                "jpeg",
                "gif",
            ]
        }
    ]);
}
function onTypeChange(type) {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        task.taskType = type;
        let data = parametersToInputs((_b = (!isCustom(type) ? DefaultTasks_1.default[task.taskType].parameters : (_a = (yield customTasks).find(t => "custom:" + t.ref === type)) === null || _a === void 0 ? void 0 : _a.parameters)) !== null && _b !== void 0 ? _b : []);
        extraValues = data.values;
        let extraParameters = document.getElementById("extra-parameters");
        extraParameters.innerHTML = "";
        extraParameters.append(...data.elements);
    });
}
function parametersToInputs(params) {
    let data = {
        elements: [],
        values: {}
    };
    params.forEach(p => {
        const inputName = document.createElement("label");
        inputName.innerText = p.name;
        let input = document.createElement("input");
        if (p.type === "textarea") {
            input = document.createElement("textarea");
        }
        else
            input.type = p.type;
        specialSetup(p, input);
        setDefault(p, input);
        input.addEventListener("change", () => {
            onChangeFunctions(p, input);
        });
        switch (p.type) {
            // Special case orders
            case "checkbox":
                data.elements.push(input, inputName, document.createElement("br"));
                break;
            // Default order
            default:
                data.elements.push(inputName, input, document.createElement("br"));
                break;
        }
    });
    return data;
    function onChangeFunctions(p, input) {
        let v;
        switch (p.type) {
            case "number":
                v = input.valueAsNumber;
                break;
            case "checkbox":
                v = input.checked;
                break;
            case "text":
            case "file":
            default:
                v = input.value;
                break;
        }
        data.values[p.inputId] = v;
    }
    function setDefault(p, input) {
        let v = p.defaultValue;
        if (typeof v !== "undefined") {
            switch (p.type) {
                case "number":
                    data.values[p.inputId] = input.valueAsNumber = v;
                    break;
                case "checkbox":
                    data.values[p.inputId] = input.checked = v;
                    break;
                case "text":
                case "textarea":
                case "file":
                default:
                    data.values[p.inputId] = input.value = v + "";
                    break;
            }
        }
    }
    function specialSetup(p, input) {
        switch (p.type) {
            case "file": { // Create a file selector
                input.readOnly = true;
                input.addEventListener("click", () => {
                    let v = selectFile();
                    if (v) {
                        input.value = v;
                        onChangeFunctions(p, input);
                    }
                });
                input.type = "text";
                break;
            }
        }
    }
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
