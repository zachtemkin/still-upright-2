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

const MainPage = ({ children, className, pageTitle }) => {
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

  const scrollToTop = () => {
    if (typeof window !== undefined)
      window.scroll({ top: 0, behavior: "smooth" })
  }

  return (
    <ThemeProvider theme={themeMode}>
      <SEO title={title} />
      <GlobalStyles />
      <SiteHeader
        onThemeToggleClick={toggleTheme}
        onPageTitleClick={scrollToTop}
        theme={theme}
        pageTitle={pageTitle}
        visible={headerIsVisible}
      />
      <div className={"page " + className}>{children}</div>
    </ThemeProvider>
  )
}

MainPage.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  pageTitle: PropTypes.string,
}

export default MainPage
