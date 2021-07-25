import Header from "../../Header";
import Task, { ITask } from "../../objects/Task";
import * as fs from "fs";
import * as Electron from "electron";
import { ITaskBuildInTemplate, ITaskTemplate, TaskActionParameter } from "../../taskActions/iTaskAction";
import DefaultTasks from "../../taskActions/DefaultTasks";

Header.setup();
const task = new Task();
task.taskType = null
let extraValues: { [key: string]: TaskActionParameter["defaultValue"] } = {};

// Add options to select type.
let taskActionTypeSelect = document.getElementById("taskActionType");
const options: HTMLOptionElement[] = [];
for (const key in DefaultTasks) {
  if (Object.prototype.hasOwnProperty.call(DefaultTasks, key)) {
    const value: ITaskBuildInTemplate = DefaultTasks[key];
    const opt = document.createElement("option");
    opt.innerText = value.name;
    opt.value = value.identifier;
    options.push(opt);
    if (task.taskType === null) onTypeChange(DefaultTasks[key].identifier);
  }
}
taskActionTypeSelect.append(...options);

// Add custom tasks, if any.
let customTasks = Task.getCustomTasks();
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

function isCustom(type: string) {
  return type.startsWith("custom:");
}

function selectFile(filter: Electron.FileFilter[] = null) {
  let files = Electron.remote.dialog.showOpenDialogSync(Electron.remote.getCurrentWindow(), {
    filters: filter,

  });
  if (!files || !files[0]) return;
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

async function onTypeChange(type: string) {
  task.taskType = type;

  let data = parametersToInputs(
    (
      !isCustom(type) ? DefaultTasks[task.taskType].parameters : (await customTasks).find(t => "custom:" + t.ref === type)?.parameters
    ) ?? []
  );
  extraValues = data.values;
  let extraParameters = document.getElementById("extra-parameters");
  extraParameters.innerHTML = "";
  extraParameters.append(...data.elements);
}

function parametersToInputs(params: TaskActionParameter[]) {
  let data: { elements: HTMLElement[], values: { [key: string]: (TaskActionParameter["defaultValue"]) } } = {
    elements: [],
    values: {}
  };
  params.forEach(p => {
    const inputName = document.createElement("label");
    inputName.innerText = p.name;
    let input: HTMLInputElement = document.createElement("input");
    if (p.type === "textarea") {
      input = document.createElement("textarea") as any;
    }
    else input.type = p.type;

    specialSetup(p, input);
    setDefault(p, input);
    input.addEventListener("change", () => {
      onChangeFunctions(p, input);
    });

    switch (p.type) {
      // Special case orders
      case "checkbox":
        data.elements.push(input, inputName, document.createElement("br"))
        break;

      // Default order
      default:
        data.elements.push(inputName, input, document.createElement("br"))
        break;
    }

  });
  return data;

  function onChangeFunctions(p: TaskActionParameter, input: HTMLInputElement) {
    let v: any;
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

  function setDefault(p: TaskActionParameter, input: HTMLInputElement) {
    let v: any = p.defaultValue;

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

  function specialSetup(p: TaskActionParameter, input: HTMLInputElement) {
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
  let taskData: ITask = {
    description: task.description,
    icon: task.icon,
    parameters: extraValues,
    taskType: task.taskType
  };

  task.mapFrom(taskData);
  let tasks = Task.getTasks();
  tasks.push(task);
  Task.saveTasks(tasks);

  Electron.remote.getCurrentWindow().close();
}