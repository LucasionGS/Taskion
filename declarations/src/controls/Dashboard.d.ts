import Task from "../objects/Task";
export default class Dashboard {
    constructor();
    addEventsToButtons(): void;
    private taskContainer;
    private controlPanel;
    setTasks(tasks: Task[]): void;
    getTasks(): Task[];
}
