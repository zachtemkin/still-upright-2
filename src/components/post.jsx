import React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"
import { ThemeConsumer } from "styled-components"
import PropTypes from "prop-types"

const Post = props => {
  return (
    <ThemeConsumer>
      {theme => {
        const primaryColor =
          theme.name === "dark" ? props.vibrantColor : props.darkMutedColor
        const secondaryColor =
          theme.name === "dark"
            ? props.lightVibrantColor
            : props.darkVibrantColor

        return (
          <article className="post" tabIndex="0">
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
              style={{
                borderColor: primaryColor,
              }}
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
                  style={{
                    color: secondaryColor,
                  }}
                >
                  {props.author}
                </span>
              </p>

              <h3
                className="post__info__title"
                style={{
                  color: secondaryColor,
                }}
              >
                {props.title}
              </h3>

              <div className="post__info__categories">
                {props.categories.map((category, index) => (
                  <p
                    key={index}
                    className="categories__tag"
                    style={{
                      backgroundColor: secondaryColor,
                    }}
                  >
                    {category.tag}
                  </p>
                ))}
              </div>
            </div>
          </article>
        )
      }}
    </ThemeConsumer>
  )
}

Post.propTypes = {
  index: PropTypes.number,
  path: PropTypes.string,
  author: PropTypes.string,
  categories: PropTypes.array,
  date: PropTypes.string,
  title: PropTypes.string,
  heroImage: PropTypes.object,
  vibrantColor: PropTypes.string,
  lightVibrantColor: PropTypes.string,
  darkVibrantColor: PropTypes.string,
  darkMutedColor: PropTypes.string,
}

export default Post
