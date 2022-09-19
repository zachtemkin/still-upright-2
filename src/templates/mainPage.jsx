import React from "react"
import SiteHeader from "../components/siteHeader"
import Seo from "../components/seo"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../themes.js"
import { GlobalStyles } from "../globalStyles"
import { useDarkMode } from "../hooks/useDarkMode"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import PropTypes from "prop-types"

const MainPage = ({ children, className, pageTitle }) => {
  const [theme, toggleTheme] = useDarkMode()
  const { title } = useSiteMetadata()
  const themeMode = theme === "light" ? lightTheme : darkTheme

  return (
    <ThemeProvider theme={themeMode}>
      <Seo title={title} />
      <GlobalStyles />
      <SiteHeader
        onClickThemeToggle={toggleTheme}
        // theme={theme}
        pageTitle={pageTitle}
      />
      <div className={"page " + className}>{children}</div>
    </ThemeProvider>
  )
}

export function Head() {
  const [theme] = useDarkMode()
  const themeMode = theme === "light" ? lightTheme : darkTheme

  return (
    <>
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      ></meta>
      <meta name="theme-color" content={`${themeMode.body}`} />
    </>
  )
}

MainPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pageTitle: PropTypes.string,
}

export default MainPage
