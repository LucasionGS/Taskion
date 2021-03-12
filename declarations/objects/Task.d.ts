import Mappable from "./Mappable";
import { TaskActionEnum } from "../taskActions/taskAction";
export default class Task extends Mappable<Task> {
    constructor();
    onClick: ((event: MouseEvent) => void);
    onContextMenu: ((event: MouseEvent) => void);
    get icon(): string;
    set icon(v: string);
    set description(v: string);
    get description(): string;
    mapFrom(task: ITask): this;
    toJSON(): ITask;
    parameters: {
        [key: string]: string | number;
    };
    element: HTMLDivElement;
    iconElement: HTMLImageElement;
    taskType: TaskActionEnum;
    private static tasksPath;
    static getTasks(): Task[];
    static saveTasks(tasks: Task[]): void;
    static newTask(): void;
}
export interface ITask {
    icon: string;
    description: string;
    parameters: {
        [key: string]: string | number;
    };
    taskType: TaskActionEnum;
}
