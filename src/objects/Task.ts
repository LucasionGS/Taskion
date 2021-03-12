import * as Electron from "electron";
import Mappable from "./Mappable";
import ModalNewTask from "../modals/newTask/ModalNewTask";
import { TaskActionEnum } from "../taskActions/taskAction";
import TaskActions from "../taskActions/taskActions";
import * as os from "os";
import * as Path from "path";
import Settings from "./Settings";
import { readFileSync, writeFileSync } from "fs";

Electron.remote

export default class Task extends Mappable<Task> {
  public constructor() {
    super();
    this.element = document.createElement("div");
    this.element.className = "task-icon";
    this.iconElement = document.createElement("img");
    this.element.appendChild(this.iconElement);

    this.element.addEventListener("click", e => typeof this.onClick === "function" ? this.onClick(e) : null)
    this.element.addEventListener("contextmenu", e => typeof this.onContextMenu === "function" ? this.onContextMenu(e) : null)
  }

  public onClick: ((event: MouseEvent) => void);
  public onContextMenu: ((event: MouseEvent) => void) = function() {

  };
  
  public get icon(): string {
    let src = this.iconElement.src;
    if (src.startsWith("file:///")) src = src.substring("file:///".length);
    return src;
  }
  public set icon(v: string) {
    this.iconElement.src = v;
  }

  public set description(v) {
    this.element.title = v;
  }
  
  public get description() {
    return this.element.title;
  }

  public mapFrom(task: ITask) {
    this.description = task.description;
    this.icon = task.icon;
    this.parameters = task.parameters;
    this.taskType = task.taskType;
    this.onClick = (e) => {
      let action = TaskActions[task.taskType] as (args: typeof task.parameters) => void;
      
      if (typeof action === "function") action(task.parameters);
    };

    return this;
  }

  toJSON(): ITask {
    return {
      icon: this.icon,
      description: this.description,
      parameters: this.parameters,
      taskType: this.taskType,
    }
  }

  public parameters: {[key: string]: string | number} = {};
  public element: HTMLDivElement;
  public iconElement: HTMLImageElement;
  public taskType: TaskActionEnum = TaskActionEnum.None;
  private static tasksPath: string = Path.resolve(os.homedir(), ".taskion", "tasks.json");
  public static getTasks() {
    try {
      let tasks: Task[] = [];
      let iTasks = JSON.parse(readFileSync(Task.tasksPath, "utf8")) as ITask[];
      tasks = iTasks.map(t => new Task().mapFrom(t));
      return tasks;
    } catch (error) {
      return [];
    }
  };

  public static saveTasks(tasks: Task[]) {
    new Settings().createFolder();
    writeFileSync(Task.tasksPath, JSON.stringify(tasks.map(t => t.toJSON())));
  }

  public static newTask() {
    let modal = new ModalNewTask();
    modal.open();
  }
}

export interface ITask {
  icon: string;
  description: string;
  parameters: {[key: string]: string | number},
  taskType: TaskActionEnum,
}