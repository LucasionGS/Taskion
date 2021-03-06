import * as Electron from "electron";
import Mappable from "./Mappable";
import ModalNewTask from "../modals/newTask/ModalNewTask";
import { ITaskTemplate, TaskActionParameter, ITaskTemplateWithRef } from "../taskActions/iTaskAction";
import * as os from "os";
import * as Path from "path";
import Settings from "./Settings";
import { readFileSync, writeFileSync } from "fs";
import Dashboard from "../controls/Dashboard";
import DefaultTasks from "../taskActions/DefaultTasks";

interface HTMLTaskElement extends HTMLDivElement {
  task: Task;
};

export default class Task extends Mappable<Task> {
  public constructor() {
    super();
    this.element = document.createElement("div") as HTMLTaskElement;
    this.element.className = "task-icon";
    this.element.draggable = true;
    this.element.task = this;
    this.iconElement = document.createElement("img");
    this.iconElement.draggable = false;
    this.element.appendChild(this.iconElement);

    this.element.addEventListener("click", e => typeof this.onClick === "function" ? this.onClick.bind(this)(e) : null)
    this.element.addEventListener("contextmenu", e => typeof this.onContextMenu === "function" ? this.onContextMenu.bind(this)(e) : null)

    this.element.addEventListener("dragstart", e => {
      Task.dragging = this;
    });
    this.element.addEventListener("dragover", e => {
      e.stopImmediatePropagation();
      e.stopPropagation();
      e.preventDefault();
      const currentTarget = e.currentTarget as HTMLTaskElement;
      if (Task.dragging != (currentTarget as HTMLTaskElement).task) {
        // this.swapTaskPositions(e, Task.dragging, currentTarget.task);
        currentTarget.task.swapTaskPositions(e);
      }
    });

    this.element.addEventListener("dragend", e => {
      Task.dragging = null;
      let d = new Dashboard();
      let ts = d.getTasks();
      Task.saveTasks(ts);
    });
  }

  private static dragging: Task = null;
  private get parent() {
    return this.element.parentElement;
  }

  private swapTaskPositions(e: DragEvent) {

    let w = this.element.getBoundingClientRect().width
    let o = e.offsetX;
    let side = (w / 2) < o;

    // Move `nodeA` to before the `nodeB`
    if (side === false) {
      if (this.element.previousElementSibling !== Task.dragging.element) this.element.parentNode.insertBefore(Task.dragging.element, this.element);
    }
    else {
      if (this.element.nextElementSibling !== Task.dragging.element) this.element.parentNode.insertBefore(Task.dragging.element, this.element.nextElementSibling);
    }

    // Move `nodeB` to before the sibling of `nodeA`
    // parentA.insertBefore(taskB.element, siblingA);
  }

  public onClick: ((this: Task, event: MouseEvent) => void);
  public onContextMenu: ((this: Task, event: MouseEvent) => void) = function (e) {
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

  public onDrop: ((this: Task, event: DragEvent) => void) = function (e) {
    // e.preventDefault();
    // e.stopPropagation();
    // console.log(e.target);
    // console.log(e.currentTarget);
    // console.log(e.relatedTarget);
  }

  public get icon(): string {
    let src = this.iconSrc;
    // if (src.startsWith("file:///")) src = src.substring("file:///".length);
    return src;
  }
  public set icon(v: string) {
    // if (Path.isAbsolute(v)) this.iconElement.src = "file:///" + v;
    // else this.iconElement.src = v;
    this.iconElement.src = this.iconSrc = v;
  }
  private iconSrc: string = "";

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
      let action: ITaskTemplate["action"];
      const customPrefix = "custom:";
      if (task.taskType.startsWith(customPrefix)) {
        let path = task.taskType.substring(customPrefix.length);
        let cTask: ITaskTemplate = (await import(path)).default;
        action = cTask.action;
      }
      else {
        action = DefaultTasks[task.taskType]?.action ?? (() => alert("Error"));
      }

      if (typeof action === "function") action(task.parameters);
    };

    return this;
  }

  public static getDefaultTasks() {
    try {
      return DefaultTasks;
    } catch (error) {
      return {};
    }
  }

  public static async getCustomTasks() {
    try {
      let list = JSON.parse(readFileSync(Task.customTasksPath, "utf8")) as string[];

      let iTasks = await Promise.all(list.map(async path => {
        let iTask: ITaskTemplateWithRef = (await import(path)).default;
        iTask.ref = path;
        return iTask;
      }));
      return iTasks;
    } catch (error) {
      console.error(error);
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

  public parameters: { [key: string]: TaskActionParameter["defaultValue"] } = {};
  public element: HTMLTaskElement;
  public iconElement: HTMLImageElement;
  public taskType: string = null;
  private static tasksPath: string = Path.resolve(os.homedir(), ".taskion", "tasks.json");
  private static defaultTasksFilesPath: string = Path.resolve(__dirname, "..", "..", "default-tasks");
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
  parameters: { [key: string]: TaskActionParameter["defaultValue"] },
  taskType: string,
}