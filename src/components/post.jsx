import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default ( props ) => {

  return (
    <article className="post" style={{backgroundColor: props.heroImage.colors.darkMuted}}>
      <Link to={props.path}><span className="post__link" /></Link>
      <div className="post__hero-image">
        <Img fluid={props.heroImage.childImageSharp.resize}></Img>
      </div>
      <div className="post__info">
        <h3 className="post__info__title" style={{color: props.heroImage.colors.lightVibrant}}>{props.title}</h3>
        <p className="post__info__author-and-date"><b>{`Post by ${props.author}`}</b>{`\n\u2022 ${props.date}`}</p>
        <p className="post__info__category" style={{color: props.heroImage.colors.darkVibrant, backgroundColor: props.heroImage.colors.lightVibrant}}>{props.category}</p>
        <p className="post__info__excerpt">{props.excerpt}</p>
      </div>
    </article>
  )
}