import React from "react"
import withLocation from "../components/withLocation"

export default ({ search }) => {
  const {test} = search

  return (
	<h3>the thing says {test}</h3>
	)
}


