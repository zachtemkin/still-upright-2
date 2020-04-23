import React, { useState, useEffect } from "react"
import { Link, graphql, navigate } from "gatsby"
import withLocation from "../components/withLocation"

const postFilter = ({ data, location, search }) => {
  const { filterBy } = search

  return (
    <div className="post-filters">
      <div className="post-filters__filter-button">Filter Posts</div>
    </div>
  )
}

export default withLocation(postFilter)
