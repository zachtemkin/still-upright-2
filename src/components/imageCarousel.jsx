import React, { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

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
  const currentThumbRef = hasGallery ? useRef(null) : null

  useEffect(() => {
    setXPos(currentImageIndex * -oneImageWidth)
    currentThumbRef && currentThumbRef.current.focus()
    currentThumbRef &&
      currentThumbRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      })
  }, [width, currentImageIndex, currentThumbRef])

  const handleClick = index => {
    setShouldAnimate(true)
    setCurrentImageIndex(index)
  }

  const getCarouselDimensions = el => {
    if (!el) return
    setWidth(el.getBoundingClientRect().width)
  }

  const setPosition = e => {
    let xPos = e.touches[0].clientX
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
      <div className="post-detail__image-container">
        <div
          className={
            "post-detail__image-container__gallery-content-wrapper" +
            (shouldAnimate
              ? " post-detail__image-container__gallery-content-wrapper--should-animate"
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
            <Link
              key={index}
              to={props.slug + "fullSize/?image=" + index}
              state={{ isPrevModal: props.isPrevModal }}
              className={
                "post-detail__image-container__slide" +
                (isActiveImage()
                  ? " post-detail__image-container__slide--active"
                  : "")
              }
              style={{ width: `calc(100% / ${props.images.length})` }}
            >
              <Img
                fluid={image.childImageSharp.feature}
                backgroundColor={image.colors.vibrant}
              />
            </Link>
          ))}
        </div>
      </div>

      {hasGallery && (
        <div className="post-detail__gallery-wrapper">
          <ol className="post-detail__gallery">
            {props.images.map((image, index) => (
              <li
                key={index}
                tabIndex="-1"
                ref={currentImageIndex === index ? currentThumbRef : null}
                className={
                  "post-detail__gallery__thumbnail" +
                  (currentImageIndex === index
                    ? " post-detail__gallery__thumbnail--active"
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

export default ImageCarousel
