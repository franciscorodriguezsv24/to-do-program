import styles from './home.module.scss'
import Moon from '../../assets/icon-moon.svg'
import Sun from '../../assets/icon-sun.svg'

import { useTheme } from '../../context/ThemeModeContext' 

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
         <button onClick={toggleTheme}>
          {theme === "light" ? <img src={Moon} alt='moon'/> : <img src={Sun} alt='sun'/>}
        </button>
        </div>
      </div>
    </div>
  )
}
