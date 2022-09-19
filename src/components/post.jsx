import React from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import { ThemeConsumer } from "styled-components"
import PropTypes from "prop-types"

const Post = (props) => {
  return (
    <ThemeConsumer>
      {(theme) => {
        const primaryColor =
          theme.name === "dark"
            ? props.darkThemePrimaryColor
            : props.lightThemePrimaryColor

        // const secondaryColor =
        //  theme.name === "dark"
        //    ? props.darkThemeSecondaryColor
        //    : props.lightThemeSecondaryColor

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
              style={{
                borderColor: primaryColor,
              }}
            >
              <GatsbyImage
                className="post__hero-image__image"
                image={props.heroImage.childImageSharp.gatsbyImageData}
                alt=""
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
                    color: primaryColor,
                  }}
                >
                  {props.author}
                </span>
              </p>

              <h3 className="post__info__title">{props.title}</h3>

              <div className="post__info__categories">
                {props.categories.map((category, index) => (
                  <p
                    key={index}
                    className="categories__tag"
                    style={{
                      backgroundColor: primaryColor,
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
