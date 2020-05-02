import React from "react"
import SiteHeader from "../components/siteHeader"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../themes.js"
import { GlobalStyles } from "../globalStyles"
import { useDarkMode } from "../hooks/useDarkMode"
import PropTypes from "prop-types"

const MainPage = ({ children }) => {
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === "light" ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      <SiteHeader onThemeToggleClick={toggleTheme} theme={theme} />
      <div className="page">{children}</div>
    </ThemeProvider>
  )
}

MainPage.propTypes = {
  children: PropTypes.object,
}

export default MainPage
