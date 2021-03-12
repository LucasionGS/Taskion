declare namespace TaskActions {
    function OpenItem({ path }: {
        path: string;
    }): void;
    function OpenWeb({ url }: {
        url: string;
    }): void;
}
export default TaskActions;
