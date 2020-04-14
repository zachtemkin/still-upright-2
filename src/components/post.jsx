import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default ( props ) => {

  return (
    <article className="post">
      <Link to={props.path}><span className="post__link" /></Link>
      <div className="post__hero-image">
        <Img fluid={props.heroImage.childImageSharp.resize}></Img>
      </div>
      <div className="post__info">
        <h3 className="post__info__title" style={{color: props.heroImage.colors.vibrant}}>{props.title}</h3>
        <p className="post__info__author-and-date">{`Post by ${props.author} \n\u2022 ${props.date}`}</p>
        <p className="post__info__category" style={{backgroundColor: props.heroImage.colors.muted}}>{props.category}</p>
        <p className="post__info__excerpt">{props.excerpt}</p>
      </div>
    </article>
  )
}