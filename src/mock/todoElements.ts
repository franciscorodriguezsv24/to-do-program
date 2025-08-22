export interface TodoElementsMock {
    id: number;
    task: string;
    done: boolean
}

export const TodoMockData: TodoElementsMock[] = [
    {
        id: 1,
        task: "Setup project",
        done: false,
        
    },
    {
        id: 2,
        task: "Build UI components",
        done: false,
       
    },
    {
        id: 3,
        task: "Write unit tests",
        done: false,
    },
    {
        id: 4,
        task: "Configure CI/CD",
        done: false,
    },
    {
        id: 5,
        task: "Prepare documentation",
        done: false,
    },
]