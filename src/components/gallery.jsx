import React, { useState, useEffect } from "react"
import Img from "gatsby-image"

const Gallery = props => {
  return (
    <div className="post-detail__gallery-wrapper">
      <ul className="post-detail__gallery">
        {props.images.map((image, index) => (
          <li
            key={index}
            className={
              "post-detail__gallery__thumbnail" +
              (props.activeThumb === index
                ? " post-detail__gallery__thumbnail--active"
                : "")
            }
            onClick={() => props.onClick(index)}
          >
            <Img
              fluid={image.childImageSharp.thumbnail}
              backgroundColor={image.colors.vibrant}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Gallery
