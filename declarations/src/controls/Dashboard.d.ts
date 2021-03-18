import Task from "../objects/Task";
export default class Dashboard {
    constructor();
    addEventsToButtons(): void;
    taskContainer: HTMLDivElement;
    controlPanel: {
        addNewTask: HTMLButtonElement;
    };
    setTasks(tasks: Task[]): void;
    getTasks(): Task[];
}
