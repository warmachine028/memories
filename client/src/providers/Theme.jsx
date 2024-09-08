import { ThemeProvider as MUIThemeProvider } from '@mui/material'
import { ThemeContext } from '../contexts'
import { useEffect, useState } from 'react'
import { Light, Dark, System } from '../styles/themes'

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(System)
  const Themes = {
    LIGHT: 'LIGHT',
    DARK: 'DARK',
    SYSTEM: 'SYSTEM'
  }
  const savedTheme = localStorage.getItem('theme') || Themes.SYSTEM
  const [mode, setMode] = useState(savedTheme)
  useEffect(() => {
    localStorage.setItem('theme', mode)
    switch (mode) {
      case Themes.DARK:
        setTheme(Dark)
        break
      case Themes.SYSTEM:
        setTheme(System)
        break
      default:
        setTheme(Light)
    }
  }, [mode, Themes.DARK, Themes.SYSTEM])

  const switchTheme = (mode) => setMode(mode)

  const values = { switchTheme, Themes, mode }
  return (
    <ThemeContext.Provider value={values}>
      <MUIThemeProvider theme={theme}>{children}</MUIThemeProvider>
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
