import Task from "../objects/Task";

export default class Dashboard {
  constructor() {
    // Initialize

    this.controlPanel.add.addEventListener("click", () => {
      Task.newTask();
    });
  }

  private taskContainer = document.getElementById("task-container") as HTMLDivElement;
  private controlPanel = {
    add: (document.getElementById("add-new-task") as HTMLButtonElement),
  }
  private tasks: Task[];
  public setTasks(tasks: Task[]) {
    this.tasks = tasks ?? [];
    this.taskContainer.innerHTML = "";
    this.taskContainer.append(...tasks.map(t => t.element));
  }
  public getTasks() {
    return this.tasks ?? [];
  }
}