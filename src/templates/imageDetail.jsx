import React, {useState, useEffect, useCallback} from "react"
import { Link, navigate, graphql } from "gatsby"
import ThemedWrapper from "../components/themedWrapper"
import Img from "gatsby-image"


const imageDetail = ({ pageContext }) => {
  return(
    <ThemedWrapper backgroundColor='#1E2431'>
      <div className="image-detail">
        <h3>this is {pageContext.slug}</h3>
      </div>
    </ThemedWrapper>
  )
}

export default imageDetail

