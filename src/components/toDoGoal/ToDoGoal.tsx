import styles from "./toDoGoal.module.scss";
import check from "../../assets/icon-check.svg";
import croos from "../../assets/icon-cross.svg";
import { use, useMemo, useRef, useState } from "react";
import { getTasks } from "../../api/GetDataTodo";
import { type TodoElementsMock } from "../../mock/todoElements";
import { useDraggableList } from "../../hooks/useDragAndDrop";

export default function ToDoGoal() {
  const data = use(getTasks());
  const nextId = useRef(6);
  const [filterStatus, setFilterStatus] = useState<string>("");

  const { items, handleDragStart, handleDragOver, handleDrop, setItems } =
    useDraggableList(data);

  const toggleTask = (id: number) => {
    setItems((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (id: number) => {
    setItems((prev) => prev.filter((task) => task.id !== id));
  };

  const addTask = (data: string) => {
    const newTask: TodoElementsMock = {
      id: nextId.current++,
      task: data,
      done: false,
    };

    setItems((prev) => [newTask, ...prev]);
  };

  const filteredData = useMemo(() => {
    if (filterStatus.trim() === "Active") {
      return items.filter((item) => item.done === false);
    } else if (filterStatus.trim() === "Completed") {
      return items.filter((item) => item.done === true);
    } else {
      return items;
    }
  }, [items, filterStatus]);

  const pendingTasks = () => {
    return items.filter((item) => !item.done);
  };

  const deleteElementsTest = () => {
    setItems((prev) => prev.filter((task) => !task.done));
  };

  return (
    <>
      <div className={styles.toDoNewItemContainer}>
        <div className={styles.buttonCard}>
          <button className={styles.buttomInputCard}></button>
        </div>
        <input
          className={styles.toDoNewItemInput}
          data-testid="input-task"
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter" && e.currentTarget.value.trim()) {
              addTask(e.currentTarget.value);
              e.currentTarget.value = "";
            }
          }}
        />
      </div>
      <div>
        <ul
          className={styles.toDoContainerCards}
          onDragOver={handleDragOver}
          aria-label="Draggable todo list"
        >
          {filteredData.map((task: TodoElementsMock, index) => {
            return (
              <li
                className={styles.toDoCard}
                key={task.id}
                onDragStart={(e) => handleDragStart(e, String(index))}
                onDrop={(e) => handleDrop(e, index)}
                draggable="true"
              >
                <div
                  className={
                    task.done ? styles.selectCardSelected : styles.selectCard
                  }
                >
                  <button
                    className={
                      task.done ? styles.buttonCardSelected : styles.buttonCard
                    }
                    onClick={() => toggleTask(task.id)}
                  >
                    {task.done && <img src={check} alt="check" />}
                  </button>
                </div>
                <div className={styles.toDoTextContainer}>
                  <p
                    className={
                      task.done ? styles.toDoTextDone : styles.toDoText
                    }
                  >
                    {task.task}
                  </p>
                </div>
                <button
                  className={styles.toDoDelete}
                  data-testid={`delete-element-${task.id}`}
                  onClick={() => deleteTask(task.id)}
                >
                  <img src={croos} alt="croos" />
                </button>
              </li>
            );
          })}
        </ul>
        <div className={styles.toDoElementsLeft}>
          <p className={styles.toDoElementsLeftTitle}>
            {pendingTasks().length} items left
          </p>
          <button
            className={styles.toDoFooterButton}
            onClick={() => deleteElementsTest()}
          >
            Clear Completed
          </button>
        </div>
      </div>

      <div className={styles.toDoFooter}>
        <button
          className={
            filterStatus === "All"
              ? styles.filterActive
              : styles.toDoFooterButton
          }
          onClick={() => setFilterStatus("All")}
        >
          All
        </button>
        <button
          className={
            filterStatus === "Active"
              ? styles.filterActive
              : styles.toDoFooterButton
          }
          onClick={() => setFilterStatus("Active")}
        >
          Active
        </button>
        <button
          className={
            filterStatus === "Completed"
              ? styles.filterActive
              : styles.toDoFooterButton
          }
          onClick={() => setFilterStatus("Completed")}
        >
          Completed
        </button>
      </div>

      <p className={styles.FooterText}>Drag and drop to reorder list</p>
    </>
  );
}
