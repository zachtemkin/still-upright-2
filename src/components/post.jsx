import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default ( props ) => {

  return (
    <article className="post">
      <Link to={props.path}><span className="post__link" /></Link>

      <div className="post__hero-image" style={{borderColor: props.heroImage.colors.vibrant}}>
        <Img fluid={props.heroImage.childImageSharp.resize}></Img>
      </div>
      
      <div className="post__info">
        <p className="post__info__by-line">
          <span className="post__info__by-line__date">
            {`${props.date} by `}
          </span>
      
          <span
            className="post__info__by-line__author"
            style={{color: props.heroImage.colors.lightVibrant}}
          >
            {props.author}
          </span>
        </p>
      
        <h3
          className="post__info__title"
          style={{color: props.heroImage.colors.lightVibrant}}
        >
            {props.title}
        </h3>
        
        <div className="post__info__categories">
          {props.categories.map(( category ) => (
          <p
            className="categories__tag"
            style={{backgroundColor: props.heroImage.colors.lightVibrant}}
          >
            {category.tag}
          </p>
          ))}
        </div>
      </div>
    </article>
  )
}