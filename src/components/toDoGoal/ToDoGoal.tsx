import styles from "./toDoGoal.module.scss"
import check from '../../assets/icon-check.svg'
import croos from '../../assets/icon-cross.svg'
import { use, useState } from "react"
import { getTasks } from "../../api/GetDataTodo"
import { type TodoElementsMock } from "../../mock/todoElements"

export default function ToDoGoal() {
    const data = use(getTasks())

    const [tasks, setTasks] = useState<TodoElementsMock[]>(data);

    const toggleTask = (id: number) => {
        setTasks((prev) =>
            prev.map((task) =>
            task.id === id ? { ...task, done: !task.done } : task
            )
        );
    };

    const deleteTask = (id: number) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };



  return (
    <div className={styles.toDoContainerCards}>
        {
            tasks.map((task:TodoElementsMock ) => {
                return (
        <div className={styles.toDoCard} key={task.id}>
            <div className={task.done ? styles.selectCardSelected : styles.selectCard}>
                <button className={task.done ? styles.buttonCardSelected : styles.buttonCard} onClick={() => toggleTask(task.id)}>
                    {
                        task.done && 
                    <img src={check} alt="check"/>

                    }
                </button>
            </div>
            <p className={task.done ? styles.toDoTextDone : styles.toDoText }>{task.task}</p>
            <button className={styles.toDoDelete} onClick={() => deleteTask(task.id)}><img src={croos} alt="croos"/></button>
        </div>)
            })
        }
    </div>
  )
}
