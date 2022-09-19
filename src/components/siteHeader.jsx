import React, { useState } from "react"
import MobileNavToggle from "../components/mobileNavToggle"
import useScrollPosition from "../hooks/useScrollPosition"
import MainNav from "../components/mainNav"
import { ThemeConsumer } from "styled-components"
import PropTypes from "prop-types"

const SiteHeader = ({ pageTitle, onClickThemeToggle, theme }) => {
  // page title sub-component --------------------------------------------------------------

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const truncateTitle = (str, num) => {
    if (str) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + "..."
    }
  }

  const toggleMobileNav = () => {
    mobileNavOpen ? setMobileNavOpen(false) : setMobileNavOpen(true)
  }

  const [titleIsVisible, setTitleIsVisible] = useState(false)

  const HeaderPageTitle = () => {
    useScrollPosition(
      ({ currPos }) => {
        const passedHeader = currPos.y > 140
        if (passedHeader !== titleIsVisible) setTitleIsVisible(passedHeader)
      },
      [titleIsVisible],
      null,
      true,
      100
    )

    const scrollToTop = () => {
      if (typeof window !== "undefined")
        window.scroll({ top: 0, behavior: "smooth" })
    }

    return (
      <div
        className={
          "page-title" + (titleIsVisible === true ? " page-title--visible" : "")
        }
      >
        <button className="page-title__item" onClick={scrollToTop}>
          {truncateTitle(pageTitle, 27)}
        </button>
      </div>
    )
  }

  // main component ------------------------------------------------------------------------

  return (
    <ThemeConsumer>
      {(theme) => (
        <header className="site-header">
          <div className="site-header__wrapper">
            <nav className="site-header__desktop-nav">
              <MainNav theme={theme} onClickThemeToggle={onClickThemeToggle} />
            </nav>

            <nav
              className={
                "site-header__mobile-nav" +
                (mobileNavOpen ? " site-header__mobile-nav--open" : "")
              }
            >
              <MainNav
                orientation="vertical"
                theme={theme}
                onClickThemeToggle={onClickThemeToggle}
              />
            </nav>
            <HeaderPageTitle />
            <MobileNavToggle
              navIsOpen={mobileNavOpen}
              onClick={toggleMobileNav}
            />
          </div>
        </header>
      )}
    </ThemeConsumer>
  )
}

SiteHeader.propTypes = {
  onClickThemeToggle: PropTypes.func,
  onPageTitleClick: PropTypes.func,
  orientation: PropTypes.string,
  theme: PropTypes.string,
  location: PropTypes.object,
  visible: PropTypes.bool,
  pageTitle: PropTypes.string,
}

export default SiteHeader
