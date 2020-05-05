import React, { useState } from "react"
import SiteHeader from "../components/siteHeader"
import SEO from "../components/seo"
import { ThemeProvider } from "styled-components"
import { lightTheme, darkTheme } from "../themes.js"
import { GlobalStyles } from "../globalStyles"
import { useDarkMode } from "../hooks/useDarkMode"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import useScrollPosition from "../hooks/useScrollPosition"
import PropTypes from "prop-types"

const MainPage = ({ children, className }) => {
  const [theme, toggleTheme] = useDarkMode()
  const themeMode = theme === "light" ? lightTheme : darkTheme
  const { title } = useSiteMetadata()

  const [headerIsVisible, setHeaderIsVisible] = useState(false)

  useScrollPosition(
    ({ prevPos, currPos }) => {
      const passedHeader = currPos.y > 140
      if (passedHeader !== headerIsVisible) setHeaderIsVisible(passedHeader)
    },
    null,
    false,
    1000,
    [headerIsVisible]
  )

  return (
    <ThemeProvider theme={themeMode}>
      <SEO title={title} />
      <GlobalStyles />
      <SiteHeader
        onThemeToggleClick={toggleTheme}
        theme={theme}
        visible={headerIsVisible}
      />
      <div className={"page " + className}>{children}</div>
    </ThemeProvider>
  )
}

MainPage.propTypes = {
  children: PropTypes.array,
  className: PropTypes.string,
}

export default MainPage
