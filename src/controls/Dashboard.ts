import Settings from "../objects/Settings";
import Task from "../objects/Task";

export default class Dashboard {
  constructor() {
    // Initialize
  }

  public addEventsToButtons() {
    this.controlPanel.addNewTask.addEventListener("click", () => {
      Task.newTask();
    });
    // this.controlPanel.toggleHideOnBlur.addEventListener("click", () => {
    //   let s = new Settings();
    // });
  }

  private taskContainer = document.getElementById("task-container") as HTMLDivElement;
  private controlPanel = {
    addNewTask: (document.getElementById("add-new-task") as HTMLButtonElement),
    // toggleHideOnBlur: (document.getElementById("toggle-hide-on-blur") as HTMLButtonElement),
  }
  public setTasks(tasks: Task[]) {
    this.taskContainer.innerHTML = "";
    this.taskContainer.append(...tasks.map(t => t.element));
  }
  public getTasks() {
    return Task.getCurrentTasks();
  }
}