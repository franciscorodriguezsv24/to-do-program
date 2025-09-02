import styles from './App.module.scss'
import { Home } from './pages/home/Home'

function App() {

  return (
      <div className={styles.appContainer}>
        <Home/>
      </div>
  )
}

export default App
