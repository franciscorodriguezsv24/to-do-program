import styles from './home.module.scss'
import Moon from '../../assets/icon-moon.svg'
import Sun from '../../assets/icon-sun.svg'

import { useTheme } from '../../context/ThemeModeContext' 
import ToDoGoal from '../../components/toDoGoal/ToDoGoal'
import { Suspense } from 'react'

export const Home = () => {

  const { theme, toggleTheme} = useTheme()

  return (
    <div className={styles.homeContainer}>
      <div className={styles.homeImgBackground}>
      </div>
      <div className={styles.homeBackground}>
      </div>
      <div className={styles.toDoMainContainer}>
        <div className={styles.toDoHeader}>
        <h1 className={styles.toDoTitle}>TODO</h1>
         <button onClick={toggleTheme} className={styles.toDoModeButton}>
          {theme === "light" ? <img src={Moon} alt='moon'/> : <img src={Sun} alt='sun'/>}
        </button>
        </div>

        <div className={styles.toDoNewItemContainer}>
          <input className={styles.toDoNewItemInput}/>
        </div>
        <Suspense fallback={<>Loading...</>}>
          <ToDoGoal/>
        </Suspense>
      </div>
    </div>
  )
}
