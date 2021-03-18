import Mappable from "./Mappable";
import { TaskActionParameter, ITaskTemplateWithRef } from "../taskActions/iTaskAction";
interface HTMLTaskElement extends HTMLDivElement {
    task: Task;
}
export default class Task extends Mappable<Task> {
    constructor();
    private static dragging;
    private get parent();
    private swapTaskPositions;
    onClick: ((this: Task, event: MouseEvent) => void);
    onContextMenu: ((this: Task, event: MouseEvent) => void);
    onDrop: ((this: Task, event: DragEvent) => void);
    get icon(): string;
    set icon(v: string);
    set description(v: string);
    get description(): string;
    mapFrom(task: ITask): this;
    static getDefaultTasks(): {
        [name: string]: import("../taskActions/iTaskAction").ITaskBuildInTemplate;
    };
    static getCustomTasks(): Promise<ITaskTemplateWithRef[]>;
    toJSON(): ITask;
    parameters: {
        [key: string]: TaskActionParameter["defaultValue"];
    };
    element: HTMLTaskElement;
    iconElement: HTMLImageElement;
    taskType: string;
    private static tasksPath;
    private static defaultTasksFilesPath;
    private static customTasksPath;
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
    taskType: string;
}
export {};
