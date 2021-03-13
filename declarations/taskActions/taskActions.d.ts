declare namespace TaskActions {
    function OpenItem({ path }: {
        path: string;
    }): void;
    function OpenWeb({ url }: {
        url: string;
    }): void;
    function CreateNewTask(): void;
}
export default TaskActions;
