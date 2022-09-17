import React from "react"
import PropTypes from "prop-types"

const MobileNavToggle = (props) => {
  return (
    <button
      className={
        "mobile-nav-toggle" +
        (props.navIsOpen ? " mobile-nav-toggle--isOpen" : "")
      }
      onClick={props.onClick}
    >
      <div className="mobile-nav-toggle__wrapper">
        <div className="mobile-nav-toggle__bar"></div>
        <div className="mobile-nav-toggle__bar"></div>
        <div className="mobile-nav-toggle__bar"></div>
      </div>
    </button>
  )
}

MobileNavToggle.propTypes = {
  navIsOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

export default MobileNavToggle
