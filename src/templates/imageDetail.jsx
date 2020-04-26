import React, { useState, useEffect } from "react"
import withLocation from "../components/withLocation"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import ImageCarousel from "../components/imageCarousel"

const ImageDetail = ({ data, search, location, pageContext }) => {
  const { slug } = pageContext
  const { image } = search
  const frontmatter = data.markdownRemark.frontmatter
  const galleryImages = frontmatter.imageGallery
  const imageIndex = !isNaN(image) ? parseInt(image, 10) : 0

  const [currentImage, setCurrentImage] = useState(imageIndex)
  const [isModal, setIsModal] = useState(false)

  useEffect(() => {
    setCurrentImage(imageIndex)
    setIsModal(location.state.isPrevModal != undefined)
  }, [imageIndex])

  return (
    <div className="image-detail">
      <div className="image-detail__header">
        <Link
          to={slug}
          state={{ modal: isModal }}
          className="image-detail__header__close-button"
          style={{ color: galleryImages[currentImage].colors.vibrant }}
        >
          Close
        </Link>
        <h1 className="image-detail__header__image-title">
          {frontmatter.title} – {currentImage}
        </h1>
      </div>
      <div className="image-detail__image-container">
        <div className="image-detail__image-wrapper">
          <Img fluid={galleryImages[currentImage].childImageSharp.feature} />
        </div>
      </div>
    </div>
  )
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(fromNow: true)
        author
        categories {
          tag
        }
        imageGallery {
          colors {
            ...GatsbyImageColors
          }
          childImageSharp {
            thumbnail: resize(
              height: 150
              width: 240
              cropFocus: CENTER
              fit: COVER
              quality: 100
            ) {
              src
              width
              height
              aspectRatio
            }
            feature: fluid(maxWidth: 700, fit: CONTAIN, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          name
        }
      }
    }
  }
`

export default withLocation(ImageDetail)
