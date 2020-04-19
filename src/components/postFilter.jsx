import React, {useState, useEffect} from "react"
import { Link, navigate } from "gatsby"
import withLocation from "../components/withLocation"

const postFilter = ({ search }) => {
  
  const {filterBy} = search

  return(
    <div className="post-filters">
      <div className="post-filters__filter-button">Filter Posts</div>
    </div>
  )
}

export default withLocation(postFilter)