import React from "react"
import PropTypes from "prop-types"

const SectionHeading = props => {
  return <h1 className="section-heading">{props.title}</h1>
}

SectionHeading.propTypes = {
  title: PropTypes.string,
}

export default SectionHeading
