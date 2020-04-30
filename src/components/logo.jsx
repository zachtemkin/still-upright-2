import React, { useState, useEffect } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import arrowLeftIcon from '../assets/images/icons/arrow-left.svg';
import arrowRightIcon from '../assets/images/icons/arrow-right.svg';
import chevronLeftIcon from '../assets/images/icons/chevron-left.svg';
import chevronRightIcon from '../assets/images/icons/chevron-right.svg';

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
  const [logoShouldTransition, setLogoShouldTransition] = useState(false)

  const logoImage =
    data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid
  
  const logoColor = data.allFile.edges[currentLogoIndex].node.colors
  
  // const logoHeight =
  //   610 / data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid
  //     .aspectRatio
  
  const logoWidth =  260 * data.allFile.edges[currentLogoIndex].node.childImageSharp.fluid.aspectRatio 

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
    <div className="logo-section">
      <div className="logo-section__label-container" style={{ color: logoColor.muted, borderTopColor: logoColor.muted  }}>
        <div className="logo-section__logo-nav">
          <p className="logo-section__logo-nav__eyebrow">{`Exhibit 00${currentLogoIndex + 1}.A / ${data.allFile.edges.length}`}</p>
          <div className="logo-section__logo-nav__button-wrapper">
            <button
              className="logo-section__logo-nav__button logo-section__label-container__button--prev"
              onClick={decrement}
            >
              <img src={chevronLeftIcon} alt=""/>
            </button>
            <button
              className="logo-section__logo-nav__button logo-section__label-container__button--next"
              onClick={increment}
            >
              <img src={chevronRightIcon} alt=""/>
            </button>
          </div>
        </div>
        <h1
          className="logo-section__label-container__label"
        >
          Logo Of The Minute
        </h1>
      </div>
      <div
        style={{ backgroundColor: logoColor.muted }}
        className={
          "logo-section__artwork" +
          (logoShouldTransition
            ? " logo-section__artwork--shouldTransition"
            : "")
        }
      >
        <Img fluid={logoImage} style={{ width: logoWidth }}/>
      </div>
    </div>
  )
}
