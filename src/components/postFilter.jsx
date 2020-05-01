import React, { useState, useEffect } from "react"
import { Link, graphql, navigate } from "gatsby"
import withLocation from "../components/withLocation"
import chevronDownIcon from "../assets/images/icons/chevron-down.svg"

const postFilter = ({ data, location, search }) => {
  const { filterBy } = search
  const [filtersExposed, setFiltersExposed] = useState(false)

  const handleClick = () => {
    filtersExposed ? setFiltersExposed(false) : setFiltersExposed(true)
  }

  return (
    <div className="post-filters">
      <button
        className={
          "post-filters__filter-button" +
          (filtersExposed ? " post-filters__filter-button--active" : "")
        }
        onClick={handleClick}
      >
        Filter Posts
        <i>
          <img src={chevronDownIcon} />
        </i>
      </button>
    </div>
  )
}

export default withLocation(postFilter)
