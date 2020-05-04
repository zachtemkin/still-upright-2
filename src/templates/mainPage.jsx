import React from "react"
import SiteHeader from "../components/siteHeader"
import SEO from "../components/seo"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../themes.js"
import { GlobalStyles } from "../globalStyles"
import { useDarkMode } from "../hooks/useDarkMode"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import PropTypes from "prop-types"

const MainPage = ({ children, className }) => {
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === "light" ? lightTheme : darkTheme
  const { title } = useSiteMetadata()

  return (
    <ThemeProvider theme={themeMode}>
      <SEO title={title} />
      <GlobalStyles />
      <SiteHeader onThemeToggleClick={toggleTheme} theme={theme} />
      <div className={"page " + className}>{children}</div>
    </ThemeProvider>
  )
}

MainPage.propTypes = {
  children: PropTypes.object,
  className: PropTypes.string,
}

export default MainPage
