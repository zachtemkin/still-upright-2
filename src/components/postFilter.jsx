import React from "react"
import withLocation from "../components/withLocation"
import chevronDownIconLight from "../assets/images/icons/chevron-down.svg"
import chevronDownIconDark from "../assets/images/icons/chevron-down--dark.svg"
import { ThemeConsumer } from "styled-components"
import PropTypes from "prop-types"

const postFilter = ({ data, location, search }) => {
  let filtersExposed = false

  const handleClick = () => {
    filtersExposed ? (filtersExposed = false) : (filtersExposed = true)
  }

  return (
    <ThemeConsumer>
      {theme => (
        <div className="post-filters">
          <button
            className={
              "su-button post-filters__filter-button" +
              (filtersExposed ? " post-filters__filter-button--active" : "")
            }
            onClick={handleClick}
          >
            Filter Posts
            <i>
              <img
                src={
                  theme.name === "dark"
                    ? chevronDownIconLight
                    : chevronDownIconDark
                }
                alt="chevron pointing down"
              />
            </i>
          </button>
        </div>
      )}
    </ThemeConsumer>
  )
}

postFilter.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  search: PropTypes.object,
}

export default withLocation(postFilter)
