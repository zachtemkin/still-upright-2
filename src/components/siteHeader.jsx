import React from "react"
import PrimaryNav from "../components/primaryNavigation"
import PropTypes from "prop-types"

const SiteHeader = props => {
  return (
    <header className="site-header">
      <div className="site-header__grid">
        <div className="site-header__wrapper">
          <PrimaryNav />
          <button
            onClick={props.onThemeToggleClick}
            className="su-button site-header__theme-toggle"
          >
            {props.theme === "dark" ? "Turn Off The Dark" : "Turn On The Dark"}
          </button>
        </div>
      </div>
    </header>
  )
}

SiteHeader.propTypes = {
  onThemeToggleClick: PropTypes.func,
  theme: PropTypes.string,
}

export default SiteHeader
