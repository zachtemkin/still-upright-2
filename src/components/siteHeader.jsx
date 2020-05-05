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

  const HeaderPageTitle = () => {
    return (
      <div
        className={
          "page-title" + (props.visible === true ? " page-title--visible" : "")
        }
      >
        {menuLinks.map(link => (
          <Link
            key={link.link}
            to={link.link}
            className="page-title__item"
            activeClassName="page-title__item--active"
          >
            {"Still Upright / " + link.name}
          </Link>
        ))}
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
  orientation: PropTypes.string,
  theme: PropTypes.string,
  pageContext: PropTypes.object,
  visible: PropTypes.bool,
}

export default SiteHeader
