import Header from "../../Header";
import Task, { ITask } from "../../objects/Task";
import * as fs from "fs";
import * as Electron from "electron";
import { TaskActionEnum, taskActionParameters, TaskActionParameters } from "../../taskActions/taskAction";

Header.setup();
const task = new Task();
task.taskType = TaskActionEnum.None;
let extraValues: {[key: string]: string | number} = {};

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
  if (!files || !files[0]) return;
  let file = (files && files[0]);
  (document.getElementById('filename_display') as HTMLInputElement).value = task.icon = file;
}

function onTypeChange(type: TaskActionEnum) {
  task.taskType = type;
  
  let data = parametersToInputs(taskActionParameters[task.taskType] ?? []);
  extraValues = data.values;
  let extraParameters = document.getElementById("extra-parameters");
  extraParameters.innerHTML = "";
  extraParameters.append(...data.elements);
}

function parametersToInputs(params: TaskActionParameters[]) {
  let data: {elements: HTMLElement[], values: {[key: string]: (string | number)}} = {
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

    data.elements.push(inputName, input, document.createElement("br"))
  });
  return data;
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