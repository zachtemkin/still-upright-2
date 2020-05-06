import React from "react"
import { graphql } from "gatsby"
import PostNav from "../components/postNav"
import Img from "gatsby-image"
import MainPage from "../templates/mainPage"
import { ThemeConsumer } from "styled-components"
import PropTypes from "prop-types"

const PostDetail = ({ data, search, pageContext }) => {
  const { next, prev } = pageContext
  const nextPost = next ? next.fields.slug : null
  const prevPost = prev ? prev.fields.slug : null

  const frontmatter = data.markdownRemark.frontmatter
  const galleryImages = data.markdownRemark.frontmatter.imageGallery

  const vibrantColor = galleryImages[0].image.colors.vibrant
  const lightVibrantColor = galleryImages[0].image.colors.lightVibrant
  const darkVibrantColor = galleryImages[0].image.colors.darkVibrant
  const darkMutedColor = galleryImages[0].image.colors.darkMuted

  return (
    <MainPage className="post-detail" pageTitle={frontmatter.title}>
      <ThemeConsumer>
        {theme => {
          const primaryColor =
            theme.name === "dark" ? vibrantColor : darkMutedColor
          const secondaryColor =
            theme.name === "dark" ? lightVibrantColor : darkVibrantColor

          return (
            <div className="post-detail__row-wrapper">
              <div
                style={{
                  borderColor: lightVibrantColor,
                }}
                className={"post-detail__info-container"}
              >
                <PostNav
                  color={primaryColor}
                  nextPost={nextPost}
                  prevPost={prevPost}
                  closeTo={"/"}
                />
                <hr
                  className="post-detail__info-container__eyebrow"
                  style={{
                    backgroundColor: primaryColor,
                  }}
                />

                <h3 className="post-detail__info-container__post-title">
                  {frontmatter.title}
                </h3>

                <p className="post-detail__info-container__post-by-line">
                  <span className="post-by-line__date">
                    {frontmatter.date} by
                  </span>

                  <span
                    className="post-by-line__author"
                    style={{
                      color: primaryColor,
                    }}
                  >
                    {" " + frontmatter.author}
                  </span>
                </p>

                <div className="post__info__categories">
                  {frontmatter.categories.map((category, index) => (
                    <p
                      key={index}
                      className="categories__tag"
                      style={{ backgroundColor: secondaryColor }}
                    >
                      {category.tag}
                    </p>
                  ))}
                </div>
              </div>

              <div className="post-detail__main-content-wrapper">
                {galleryImages.map((figure, index) => (
                  <div
                    key={index}
                    className="post-detail__main-content-wrapper__image"
                  >
                    <Img fluid={figure.image.childImageSharp.feature} />
                    <p
                      className="post-detail__main-content-wrapper__caption"
                      style={{
                        color:
                          theme.name === "dark"
                            ? figure.image.colors.vibrant
                            : figure.image.colors.darkMuted,
                      }}
                    >
                      <b className="caption-leadin">
                        {"Exhibit 00" +
                          (index + 1) +
                          (figure.caption ? ": " : "")}
                      </b>
                      <span className="caption-body">
                        {figure.caption && figure.caption}
                      </span>
                    </p>
                  </div>
                ))}

                {data.markdownRemark.html && (
                  <div
                    className="post-detail__text-container"
                    style={{
                      color: secondaryColor,
                      borderColor: primaryColor,
                    }}
                    dangerouslySetInnerHTML={{
                      __html: data.markdownRemark.html,
                    }}
                  ></div>
                )}
              </div>
            </div>
          )
        }}
      </ThemeConsumer>
    </MainPage>
  )
}

PostDetail.propTypes = {
  data: PropTypes.object,
  search: PropTypes.object,
  pageContext: PropTypes.object,
}

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date(fromNow: true)
        author
        categories {
          tag
        }
        imageGallery {
          image {
            colors {
              ...GatsbyImageColors
            }
            childImageSharp {
              thumbnail: resize(
                height: 180
                width: 240
                cropFocus: CENTER
                fit: COVER
                quality: 100
              ) {
                src
                width
                height
                aspectRatio
              }
              feature: fluid(maxWidth: 815, fit: COVER, quality: 100) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
          caption
        }
      }
    }
  }
`
export default PostDetail
