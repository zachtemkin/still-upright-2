import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

export default props => {
  return (
    <article className="post">
      <Link
        to={props.path}
        state={{
          modal: false,
        }}
      >
        <span className="post__link" />
      </Link>

      <div
        className="post__hero-image"
        style={{ borderColor: props.vibrantColor }}
      >
        <Img
          className="post__hero-image__image"
          fluid={props.heroImage.childImageSharp.resize}
          durationFadeIn={props.index * 0.3}
        />
      </div>

      <div className="post__info">
        <p className="post__info__by-line">
          <span className="post__info__by-line__date">
            {`${props.date} by `}
          </span>

          <span
            className="post__info__by-line__author"
            style={{ color: props.lightVibrantColor }}
          >
            {props.author}
          </span>
        </p>

        <h3
          className="post__info__title"
          style={{ color: props.lightVibrantColor }}
        >
          {props.title}
        </h3>

        <div className="post__info__categories">
          {props.categories.map((category, index) => (
            <p
              key={index}
              className="categories__tag"
              style={{ backgroundColor: props.lightVibrantColor }}
            >
              {category.tag}
            </p>
          ))}
        </div>
      </div>
    </article>
  )
}
