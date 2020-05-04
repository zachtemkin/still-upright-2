import React from "react"
import PropTypes from "prop-types"

const MobileNavToggle = props => {
  return (
    <div
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
    </div>
  )
}

MobileNavToggle.propTypes = {
  navIsOpen: PropTypes.bool,
  onClick: PropTypes.func,
}

export default MobileNavToggle
