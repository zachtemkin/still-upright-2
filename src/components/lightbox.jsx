import React, {useState, useEffect} from "react"
import Img from "gatsby-image"
import { navigate } from '@reach/router'

export default ( props ) => {

  function handleClick(e) {
    e.preventDefault
    props.sendStatus(false)
    // navigate(`/`)
  }
  
  return(
    <div className={"lightbox" + (props.isVisible ? " lightbox--is-visible" : "")}>
      <div
        className="lightbox__overlay"
        onClick={handleClick}
      ></div>
      
      <div
        className="lightbox__featured-content-wrapper"
        style={{boxShadow: `0px 0px 0px 1px ${props.featuredPost.lightVibrantColor}`}}
      >
        <div className="lightbox__info-container">
          <h3 className="lightbox__info-container__post-title">{props.featuredPost.title}</h3>
          <p className="lightbox__info-container__post-by-line">
            <span className="post-by-line__date">
              {`${props.featuredPost.date} by `}
            </span>
            <span
              className="post-by-line__author"
              style={{color: props.featuredPost.vibrantColor}}
            >
              {props.featuredPost.author}
            </span>
          </p>
        </div>
          
        <div className="lightbox__image-container">
          <div className="lightbox__image-container__image-wrapper">
            <Img fluid={props.featuredPost.heroImage.childImageSharp.fluid}></Img>
          </div>
        </div>
        
        {props.featuredPost.imageGallery !== null
          ? 
            <div className="lightbox__gallery-wrapper">
              <ul 
                className="lightbox__gallery"
                style={{borderColor: props.featuredPost.vibrantColor}}
              >
                {props.featuredPost.imageGallery.map(( image ) => (
                  <li className="lightbox__gallery__thumbnail">
                    <Img fluid={image.childImageSharp.resize} />
                  </li>
                ))}
              </ul>
            </div>
          
          : 
            ''
        } 

        {props.featuredPost.content !== ""
          ?
            <div className="lightbox__text-wrapper">
              <div
                className="lightbox__text-container"
                dangerouslySetInnerHTML={{__html: props.featuredPost.content}}
              >
              </div>
            </div>

            :
              ''
        }
        
      </div>
    </div>
  )
}