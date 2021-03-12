import Task from "../objects/Task";
export default class Dashboard {
    constructor();
    private taskContainer;
    private controlPanel;
    private tasks;
    setTasks(tasks: Task[]): void;
    getTasks(): Task[];
}
