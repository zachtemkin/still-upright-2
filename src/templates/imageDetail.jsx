import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Img from "gatsby-image"
import ImageCarousel from "../components/imageCarousel"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"

const ImageDetail = ({ data, location, pageContext }) => {
  const {slug} = pageContext
  const galleryImages = data.markdownRemark.frontmatter.imageGallery

  return (
    <div className="image-detail">
      <Link to={slug} className="close">Close</Link>
      <ImageCarousel
        images={galleryImages}
        queryString={0}
        slug={slug}
      />
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

export default ImageDetail