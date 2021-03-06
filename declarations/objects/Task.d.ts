import Mappable from "./Mappable";
import { TaskActionType } from "../taskActions/taskAction";
import { TaskActionParameter } from "../taskActions/iTaskAction";
interface HTMLTaskElement extends HTMLDivElement {
    task: Task;
}
export default class Task extends Mappable<Task> {
    constructor();
    onClick: ((this: Task, event: MouseEvent) => void);
    onContextMenu: ((this: Task, event: MouseEvent) => void);
    get icon(): string;
    set icon(v: string);
    set description(v: string);
    get description(): string;
    mapFrom(task: ITask): this;
    toJSON(): ITask;
    parameters: {
        [key: string]: TaskActionParameter["defaultValue"];
    };
    element: HTMLTaskElement;
    iconElement: HTMLImageElement;
    taskType: TaskActionType;
    private static tasksPath;
    static getTasks(): Task[];
    static saveTasks(tasks: Task[]): void;
    static getCurrentTasks(): Task[];
    static newTask(): void;
}
export interface ITask {
    icon: string;
    description: string;
    parameters: {
        [key: string]: TaskActionParameter["defaultValue"];
    };
    taskType: TaskActionType;
}
export {};
