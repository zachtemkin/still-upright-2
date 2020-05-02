import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import chevronLeftIcon from "../assets/images/icons/chevron-left--dark.svg"
import chevronRightIcon from "../assets/images/icons/chevron-right--dark.svg"

const LogoSection = () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativeDirectory: { eq: "assets/images/logos" } }
        sort: { order: DESC, fields: sourceInstanceName }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(
                maxHeight: 260
                cropFocus: CENTER
                fit: COVER
                quality: 100
              ) {
                ...GatsbyImageSharpFluid
              }
            }
            colors {
              ...GatsbyImageColors
            }
            birthTime(fromNow: true)
          }
        }
      }
    }
  `)

  const [currentLogoIndex, setCurrentLogoIndex] = useState(0)

  const logoImage =
    data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid

  const logoColor = data.allFile.edges[currentLogoIndex].node.colors

  const logoWidth =
    260 *
    data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid.aspectRatio

  const increment = () => {
    if (currentLogoIndex < data.allFile.edges.length - 1) {
      setCurrentLogoIndex(currentLogoIndex + 1)
    } else {
      setCurrentLogoIndex(0)
    }
  }

  const decrement = () => {
    if (currentLogoIndex > 0) {
      setCurrentLogoIndex(currentLogoIndex - 1)
    } else {
      setCurrentLogoIndex(data.allFile.edges.length - 1)
    }
  }

  return (
    <div className="logo-section">
      <div className="logo-section__label-container">
        <h1 className="logo-section__label-container__section-heading">
          Logo Of The Minute
        </h1>
        <p className="logo-section__label-container__description">
          Here at Still Upright we strive to keep things fresh, so we&rsquo;ll
          bring you a new &ldquo;Logo&rdquo; every so often to keep things
          from getting stale. We might even put it on some merch if we&rsquo;re
          feeling ambitious.
        </p>
      </div>
      <div
        style={{ backgroundColor: logoColor.muted }}
        className="logo-section__artwork"
      >
        <div className="logo-section__logo-nav">
          <p className="logo-section__logo-nav__eyebrow">{`Logo 00${currentLogoIndex +
            1} / 00${data.allFile.edges.length}`}</p>
          <div className="logo-section__logo-nav__button-wrapper">
            <button
              className="logo-section__logo-nav__button logo-section__label-container__button--prev"
              onClick={decrement}
            >
              <img src={chevronLeftIcon} alt="" />
            </button>
            <button
              className="logo-section__logo-nav__button logo-section__label-container__button--next"
              onClick={increment}
            >
              <img src={chevronRightIcon} alt="" />
            </button>
          </div>
        </div>
        <Img fluid={logoImage} style={{ width: logoWidth }} />
      </div>
    </div>
  )
}

export default LogoSection
