import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default () => {
  const data = useStaticQuery(graphql`
    query {
      allFile(
        filter: { relativeDirectory: { eq: "assets/images/logos" } }
        sort: { order: DESC, fields: sourceInstanceName }
      ) {
        edges {
          node {
            childImageSharp {
              fluid(maxWidth: 400, fit: CONTAIN, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
                presentationHeight
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
  const [logoShouldTransition, setLogoShouldTransition] = useState(false)

  const logoImage =
    data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid
  const logoColor = data.allFile.edges[currentLogoIndex].node.colors
  const logoHeight =
    data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid
      .presentationHeight

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

  // useEffect(() => {
  //   console.log('update')
  //   setLogoShouldTransition(true)
  //   return () => setTimeout(() => setLogoShouldTransition(false), 2000)
  // }, [currentLogoIndex])

  return (
    <div className="logo-section" style={{ height: logoHeight }}>
      <div className="logo-section__label-container">
        <h1
          className="logo-section__label-container__label"
          style={{ color: logoColor.vibrant }}
        >
          Still Upright: Logo Of The Minute
        </h1>
        <div className="logo-section__label-container__button-wrapper">
          <button
            className="logo-section__label-container__button logo-section__label-container__button--prev"
            style={{ color: logoColor.muted, borderColor: logoColor.muted }}
            onClick={decrement}
          >
            Prev
          </button>
          <button
            className="logo-section__label-container__button logo-section__label-container__button--next"
            style={{ color: logoColor.muted, borderColor: logoColor.muted }}
            onClick={increment}
          >
            Next
          </button>
        </div>
      </div>
      <div
        className={
          "logo-section__artwork" +
          (logoShouldTransition
            ? " logo-section__artwork--shouldTransition"
            : "")
        }
      >
        <Img fluid={logoImage} />
      </div>
      <div className="logo-section__meta-info-container">
        <hr
          className="logo-section__meta-info-container__eyebrow"
          style={{ borderColor: logoColor.muted }}
        />
        <p className="logo-section__meta-info-container__by-line">
          Enstated by royal decree{" "}
          {data.allFile.edges[currentLogoIndex].node.birthTime}
        </p>
      </div>
    </div>
  )
}
