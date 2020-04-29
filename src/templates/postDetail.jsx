import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import withLocation from "../components/withLocation"
import SiteHeader from "../components/siteHeader"
import PostNav from "../components/postNav"
import ImageCarousel from "../components/imageCarousel"

const PostDetail = ({ data, search, pageContext }) => {
  const { next, prev, slug } = pageContext
  const nextPost = next ? next.fields.slug : null
  const prevPost = prev ? prev.fields.slug : null

  const frontmatter = data.markdownRemark.frontmatter
  const galleryImages = data.markdownRemark.frontmatter.imageGallery

  const vibrantColor = galleryImages[0].colors.vibrant
  const lightVibrantColor = galleryImages[0].colors.lightVibrant

  return (
    <>
      {/*<SiteHeader />*/}
      <div className="post-detail">
        <div className="post-detail__row-wrapper">
          <div
            style={{
              borderColor: lightVibrantColor,
            }}
            className={"post-detail__info-container"}
          >
            <PostNav
              color={vibrantColor}
              nextPost={nextPost}
              prevPost={prevPost}
              closeTo={"/"}
            />
            <hr
              className="post-detail__info-container__eyebrow"
              style={{
                backgroundColor: vibrantColor,
              }}
            />

            <h3 className="post-detail__info-container__post-title">
              {frontmatter.title}
            </h3>

            <p className="post-detail__info-container__post-by-line">
              <span className="post-by-line__date">{frontmatter.date} by</span>

              <span
                className="post-by-line__author"
                style={{
                  color: vibrantColor,
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
                  style={{ backgroundColor: lightVibrantColor }}
                >
                  {category.tag}
                </p>
              ))}
            </div>
          </div>
          <div className="post-detail__main-content-wrapper">
            <ImageCarousel
              images={galleryImages}
              queryString={search}
              slug={slug}
            />

            {data.markdownRemark.html && (
              <div
                className="post-detail__text-container"
                style={{
                  color: lightVibrantColor,
                  borderColor: vibrantColor,
                }}
                dangerouslySetInnerHTML={{
                  __html: data.markdownRemark.html,
                }}
              ></div>
            )}
          </div>
        </div>
      </div>
    </>
  )
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
            feature: resize(
              height: 810
              width: 1080
              cropFocus: ATTENTION
              fit: COVER
              quality: 100
            ) {
              src
              width
              height
              aspectRatio
            }
          }
          name
        }
      }
    }
  }
`
export default withLocation(PostDetail)
