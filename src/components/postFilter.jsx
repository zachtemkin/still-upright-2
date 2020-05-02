import React from "react"
import withLocation from "../components/withLocation"
import chevronDownIcon from "../assets/images/icons/chevron-down.svg"
import PropTypes from "prop-types"

const postFilter = ({ data, location, search }) => {
  let filtersExposed = false

  const handleClick = () => {
    filtersExposed ? (filtersExposed = false) : (filtersExposed = true)
  }

  return (
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
          <img src={chevronDownIcon} alt="chevron pointing down" />
        </i>
      </button>
    </div>
  )
}

postFilter.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
  search: PropTypes.object,
}

export default withLocation(postFilter)
