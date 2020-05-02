import React, { useState, useEffect, useRef } from "react"
import Img from "gatsby-image"
import PropTypes from "prop-types"

const ImageCarousel = props => {
  // const defaultQueryString = !isNaN(props.queryString.imageIndex) ? props.queryString.imageIndex : "0"

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [rel, setRel] = useState(null)
  const [width, setWidth] = useState(null)
  const [xPos, setXPos] = useState(0)
  const [lastXPos, setLastXPos] = useState(null)
  const [shouldAnimate, setShouldAnimate] = useState(false)

  // const newurl = `${props.slug}\?imageIndex=${currentImageIndex}`
  // window.history.pushState({ path: newurl }, "", newurl);

  const oneImageWidth = width / props.images.length
  const hasGallery = props.images.length > 1
  const currentThumbRef = useRef(null)

  useEffect(() => {
    setXPos(currentImageIndex * -oneImageWidth)
    hasGallery && currentThumbRef.current.focus()
    hasGallery &&
      currentThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
  }, [width, currentImageIndex, currentThumbRef, oneImageWidth, hasGallery])

  const handleClick = index => {
    setShouldAnimate(true)
    setCurrentImageIndex(index)
  }

  const getCarouselDimensions = el => {
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
  }

  const calculateXPos = e => {
    if (e.touches[0].clientX - rel >= 0) {
      return 0
    }
    if (e.touches[0].clientX - rel <= -(width - width / props.images.length)) {
      return -(width - width / props.images.length)
    }
    return e.touches[0].clientX - rel
  }

  const calculateCurrentImage = () => {
    const direction = lastXPos > xPos ? "left" : "right"

    if (direction === "left") {
      setCurrentImageIndex(Math.ceil(Math.abs(xPos / oneImageWidth)))
    }

    if (direction === "right") {
      setCurrentImageIndex(Math.floor(Math.abs(xPos / oneImageWidth)))
    }

    setXPos(currentImageIndex * -oneImageWidth)
  }

  const handleTouchStart = e => {
    setDragging(true)
    setShouldAnimate(false)
    setRel(e.touches[0].clientX - xPos)
    setLastXPos(xPos)
    e.stopPropagation()
  }

  const handleTouchEnd = e => {
    setDragging(false)
    setShouldAnimate(true)
    calculateCurrentImage()
    e.stopPropagation()
  }

  const handleTouchMove = e => {
    if (!dragging) return
    setXPos(calculateXPos(e))
    e.stopPropagation()
  }

  const isActiveImage = index => index === currentImageIndex

  return (
    <div>
      <div className="image-carousel">
        <div
          className={
            "image-carousel__gallery-content-wrapper" +
            (shouldAnimate
              ? " image-carousel__gallery-content-wrapper--should-animate"
              : "")
          }
          ref={el => getCarouselDimensions(el)}
          onTouchStart={e => handleTouchStart(e)}
          onTouchEnd={e => handleTouchEnd(e)}
          onTouchMove={e => handleTouchMove(e)}
          style={{
            width: `calc(100% * ${props.images.length})`,
            left: `${xPos}px`,
          }}
        >
          {props.images.map((image, index) => (
            <div
              key={index}
              className={
                "image-carousel__slide" +
                (isActiveImage() ? " image-carousel__slide--active" : "")
              }
              style={{ width: `calc(100% / ${props.images.length})` }}
            >
              <Img
                fluid={image.childImageSharp.feature}
                backgroundColor={image.colors.vibrant}
              />
            </div>
          ))}
        </div>
      </div>

      {hasGallery && (
        <div className="image-carousel__gallery-wrapper">
          <ol className="image-carousel__gallery">
            {props.images.map((image, index) => (
              <li
                key={index}
                tabIndex="-1"
                ref={currentImageIndex === index ? currentThumbRef : null}
                className={
                  "image-carousel__gallery__thumbnail" +
                  (currentImageIndex === index
                    ? " image-carousel__gallery__thumbnail--active"
                    : "")
                }
                style={{
                  color: image.colors.vibrant,
                }}
                onClick={() => handleClick(index)}
              >
                <Img
                  fluid={image.childImageSharp.thumbnail}
                  backgroundColor={image.colors.vibrant}
                />
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  )
}

ImageCarousel.propTypes = {
  images: PropTypes.array,
  slug: PropTypes.string,
}

export default ImageCarousel
