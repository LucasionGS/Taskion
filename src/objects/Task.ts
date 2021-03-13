import * as Electron from "electron";
import Mappable from "./Mappable";
import ModalNewTask from "../modals/newTask/ModalNewTask";
import { TaskActionType, TaskActions } from "../taskActions/taskAction";
import { ICustomTask, TaskActionParameter, ICustomTaskWithRef } from "../taskActions/iTaskAction";
import * as os from "os";
import * as Path from "path";
import Settings from "./Settings";
import { readFileSync, writeFileSync } from "fs";
import Dashboard from "../controls/Dashboard";

interface HTMLTaskElement extends HTMLDivElement {
  task: Task;
};

export default class Task extends Mappable<Task> {
  public constructor() {
    super();
    this.element = document.createElement("div") as HTMLTaskElement;
    this.element.className = "task-icon";
    this.element.task = this;
    this.iconElement = document.createElement("img");
    this.element.appendChild(this.iconElement);

    this.element.addEventListener("click", e => typeof this.onClick === "function" ? this.onClick.bind(this)(e) : null)
    this.element.addEventListener("contextmenu", e => typeof this.onContextMenu === "function" ? this.onContextMenu.bind(this)(e) : null)
  }

  public onClick: ((this: Task, event: MouseEvent) => void);
  public onContextMenu: ((this: Task, event: MouseEvent) => void) = function(e) {
    e.preventDefault();
    let self = this;
    let allTasks = Task.getCurrentTasks();
    let taskIndex = allTasks.findIndex(t => t == self);
    let menu = Electron.remote.Menu.buildFromTemplate([
      {
        label: "Move left <=",
        click() {
          const dashboard = new Dashboard();
          let other = allTasks[taskIndex - 1];
          allTasks[taskIndex - 1] = self;
          allTasks[taskIndex] = other;
          Task.saveTasks(allTasks);
          dashboard.setTasks(allTasks);
        },
        enabled: taskIndex > 0,
      },
      {
        label: "Move right =>",
        click() {
          const dashboard = new Dashboard();
          let other = allTasks[taskIndex + 1];
          allTasks[taskIndex + 1] = self;
          allTasks[taskIndex] = other;
          Task.saveTasks(allTasks);
          dashboard.setTasks(allTasks);
        },
        enabled: allTasks.length - 1 > taskIndex,
      },
      {
        label: "Delete",
        click() {
          let tasks = Task.getCurrentTasks();
          let index = tasks.findIndex(t => t === self);
          if (index > -1) {
            tasks.splice(index, 1);
            Task.saveTasks(tasks);
            new Dashboard().setTasks(tasks);
          }
        }
      },
    ]);

    menu.popup();
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
    this.onClick = async (e) => {
      let action: (args: typeof task.parameters) => void;
      let customPrefix = "custom:";
      if (task.taskType.startsWith(customPrefix)) {
        let path = task.taskType.substring(customPrefix.length);
        let cTask: ICustomTask = (await import(path)).default;

        action = cTask.action
      }
      else {
        action = TaskActions[task.taskType] as (args: typeof task.parameters) => void;
      }
      
      if (typeof action === "function") action(task.parameters);
    };

    return this;
  }

  public static async getCustomTasks() {
    try {
      let list = JSON.parse(readFileSync(Task.customTasksPath, "utf8")) as string[];

      let iTasks = await Promise.all(list.map(async path => {
        let iTask: ICustomTaskWithRef = (await import(path)).default;
        iTask.ref = path;
        return iTask;
      }));
      return iTasks;
    } catch (error) {
      return [];
    }
  }

  toJSON(): ITask {
    return {
      icon: this.icon,
      description: this.description,
      parameters: this.parameters,
      taskType: this.taskType,
    }
  }

  public parameters: {[key: string]: TaskActionParameter["defaultValue"]} = {};
  public element: HTMLTaskElement;
  public iconElement: HTMLImageElement;
  public taskType: TaskActionType = TaskActionType.None;
  private static tasksPath: string = Path.resolve(os.homedir(), ".taskion", "tasks.json");
  private static customTasksPath: string = Path.resolve(os.homedir(), ".taskion", "customTasks.json");
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

  public static getCurrentTasks(): Task[] {
    return ([...document.querySelectorAll(".task-icon")] as HTMLTaskElement[]).map(e => e.task);
  }

  public static newTask() {
    let modal = new ModalNewTask();
    modal.open(() => {
      let dashboard = new Dashboard();
      dashboard.setTasks(Task.getTasks());
      let win = Electron.remote.getCurrentWindow();
      win.show();
    });
  }
}

export interface ITask {
  icon: string;
  description: string;
  parameters: {[key: string]: TaskActionParameter["defaultValue"]},
  taskType: TaskActionType,
}