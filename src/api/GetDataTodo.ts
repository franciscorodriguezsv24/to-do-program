import { TodoMockData } from "../mock/todoElements";

const getTasksElements = Promise.resolve(TodoMockData);

export function getTasks() {
    return getTasksElements;
}
