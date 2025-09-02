import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import ToDoGoal from "./ToDoGoal";
import "@testing-library/jest-dom";

vi.mock("react", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react")>();
  return {
    ...actual,
    use: (value: unknown) => {
      if (Array.isArray(value) || typeof value === "object") {
        return value;
      }
      return [];
    },
  };
});
//los test se rompieron con el uso de use() tener en cuenta el siguiente codigo para solventar algun error de esos

//mock to delete
vi.mock("../../api/GetDataTodo", () => ({
  getTasks: () => [
    { id: 1, task: "First task", done: false },
    { id: 2, task: "Finished task", done: true },
    { id: 3, task: "Second task", done: false },
  ],
}));

test("testing the input element", () => {
  render(<ToDoGoal />);
  const input = screen.getByTestId("input-task");
  expect(input).toHaveAttribute("type", "text");
});

test("testing add new element to Todo List", () => {
  render(<ToDoGoal />);
});

describe("ToDoGoal component", () => {
  test("Add new task to the Todo list", () => {
    render(<ToDoGoal />);

    const input = screen.getByTestId("input-task");

    fireEvent.change(input, { target: { value: "Aprender testing" } });

    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    expect(screen.getByText("Aprender testing")).toBeInTheDocument();

    expect(input).toHaveValue("");
  });

  test("Delete a Todo with x button", () => {
    render(<ToDoGoal />);

    expect(screen.getByText("First task")).toBeInTheDocument();

    const deleteButton = screen.getByTestId("delete-element-1");

    fireEvent.click(deleteButton);

    expect(screen.queryByText("First task")).not.toBeInTheDocument();
  });

  test("Filtered button All", () => {
    render(<ToDoGoal />);

    fireEvent.click(screen.getByRole("button", { name: /All/i }));

    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.getByText("Finished task")).toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
  });

  test("filtered button Active", () => {
    render(<ToDoGoal />);

    fireEvent.click(screen.getByRole("button", { name: /Active/i }));

    expect(screen.getByText("First task")).toBeInTheDocument();
    expect(screen.queryByText("Finished task")).not.toBeInTheDocument();
    expect(screen.getByText("Second task")).toBeInTheDocument();
  });

  test("Filtered button Completed", () => {
    render(<ToDoGoal />);

    const completedButton = screen.getByText("Completed");
    fireEvent.click(completedButton);

    expect(screen.queryByText("First task")).not.toBeInTheDocument();
    expect(screen.getByText("Finished task")).toBeInTheDocument();
    expect(screen.queryByText("Second task")).not.toBeInTheDocument();
  });
});
