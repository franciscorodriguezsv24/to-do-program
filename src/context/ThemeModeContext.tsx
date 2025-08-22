import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"; 

type Theme = 'light' | 'dark';

interface ThemeAction {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeAction>({ 
  theme: 'light',
  toggleTheme: () => {}
})

export const ThemeProvider = ({ children }: {children: ReactNode}) => {

  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }

  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme])

  return (
    <ThemeContext.Provider value={value}>
      { children }
    </ThemeContext.Provider>
  )
}

/* eslint-disable react-refresh/only-export-components */
export const useTheme = () => useContext(ThemeContext)