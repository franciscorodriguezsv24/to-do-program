type Subtasks = {
    id:  number;
    task: string;
    done: boolean;
}

export interface TodoElementsMock {
    id: number;
    task: string;
    done: boolean
    subtasks: Subtasks[]
}

export const TodoMockData: TodoElementsMock[] = [
    {
        id: 1,
        task: "Setup project",
        done: false,
        subtasks: [
            { id: 1, task: "Initialize repo", done: false },
            { id: 2, task: "Install dependencies", done: false },
        ],
    },
    {
        id: 2,
        task: "Build UI components",
        done: false,
        subtasks: [
            { id: 1, task: "Create button", done: false },
            { id: 2, task: "Create card", done: false },
            { id: 3, task: "Create sidebar", done: false },
        ],
    },
    {
        id: 3,
        task: "Write unit tests",
        done: false,
        subtasks: [
            { id: 1, task: "Test button", done: false },
            { id: 2, task: "Test card", done: false },
        ],
    },
    {
        id: 4,
        task: "Configure CI/CD",
        done: false,
        subtasks: [
            { id: 1, task: "Setup GitHub Actions", done: false },
            { id: 2, task: "Add test pipeline", done: false },
        ],
    },
    {
        id: 5,
        task: "Prepare documentation",
        done: false,
        subtasks: [
            { id: 1, task: "Write README", done: false },
            { id: 2, task: "Add API reference", done: false },
            { id: 3, task: "Add contribution guide", done: false },
        ],
    },
]