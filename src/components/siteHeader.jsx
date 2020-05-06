import React, { useState } from "react"
import MobileNavToggle from "../components/mobileNavToggle"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import PropTypes from "prop-types"

const SiteHeader = props => {
  const { menuLinks } = useSiteMetadata()

  const HeaderNav = ({ orientation }) => {
    return (
      <ul
        className={
          "header-menu" +
          (orientation === "horizontal" ? " header-menu--horizontal" : "") +
          (orientation === "vertical" ? " header-menu--vertical" : "")
        }
      >
        {menuLinks.map((item, index) => (
          <li className="header-menu__item" key={index}>
            <Link
              className="header-menu__link"
              activeClassName="header-menu__link--active"
              to={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
        <li className="header-menu__item">
          <button
            onClick={props.onThemeToggleClick}
            className="su-button site-header__theme-toggle"
          >
            {props.theme === "dark" ? "Turn Off The Dark" : "Turn On The Dark"}
          </button>
        </li>
      </ul>
    )
  }

  HeaderNav.defaultProps = {
    orientation: "horizontal",
  }

  const truncateTitle = (str, num) => {
    if (str) {
      if (str.length <= num) {
        return str
      }
      return str.slice(0, num) + "..."
    }
  }

  const HeaderPageTitle = () => {
    return (
      <div
        className={
          "page-title" + (props.visible === true ? " page-title--visible" : "")
        }
      >
        <p className="page-title__item" onClick={props.onPageTitleClick}>
          {truncateTitle(props.pageTitle, 27)}
        </p>
      </div>
    )
  }

  const [mobileNavOpen, setMobileNavOpen] = useState(false)

  const toggleMobileNav = () => {
    mobileNavOpen ? setMobileNavOpen(false) : setMobileNavOpen(true)
  }

  return (
    <header className="site-header">
      <div className="site-header__wrapper">
        <nav className="site-header__desktop-nav">
          <HeaderNav />
        </nav>

        <nav
          className={
            "site-header__mobile-nav" +
            (mobileNavOpen ? " site-header__mobile-nav--open" : "")
          }
        >
          <HeaderNav orientation="vertical" />
        </nav>

        <HeaderPageTitle />
        <MobileNavToggle navIsOpen={mobileNavOpen} onClick={toggleMobileNav} />
      </div>
    </header>
  )
}

SiteHeader.propTypes = {
  onThemeToggleClick: PropTypes.func,
  onPageTitleClick: PropTypes.func,
  orientation: PropTypes.string,
  theme: PropTypes.string,
  location: PropTypes.object,
  visible: PropTypes.bool,
  pageTitle: PropTypes.string,
}

export default SiteHeader
