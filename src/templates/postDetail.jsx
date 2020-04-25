import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import withLocation from "../components/withLocation"
import SiteHeader from "../components/siteHeader"
import ModalNav from "../components/modalNav"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"
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
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        <div className={"post-detail" + (modal ? " post-detail--modal" : "")}>
          {modal ? (
            <ModalNav
              color={vibrantColor}
              nextPost={nextPost}
              prevPost={prevPost}
              closeTo={'/'}
            />
          ) : (
            <SiteHeader />
          )}

          <div
            className="post-detail__featured-content-wrapper"
            style={{
              borderColor: lightVibrantColor,
            }}
          >
            <div
              className={
                "post-detail__info-container" +
                (modal ? " post-detail__info-container--modal" : "")
              }
            >
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
                <span className="post-by-line__date">
                  {frontmatter.date} by
                </span>

                <span
                  className="post-by-line__author"
                  style={{
                    color: vibrantColor,
                  }}
                >
                  {" " + frontmatter.author}
                </span>
              </p>
            </div>

            <ImageCarousel
              images={galleryImages}
              queryString={search}
              slug={slug}
              isPrevModal={modal}
            />

            {data.markdownRemark.html && (
              <div
                className={
                  "post-detail__text-container" +
                  (modal ? " post-detail__text-container--modal" : "")
                }
                style={{
                  color: lightVibrantColor,
                  borderColor: vibrantColor,
                }}
                dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
              ></div>
            )}
          </div>
        </div>
      )}
    </ModalRoutingContext.Consumer>
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
              height: 150
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
              height: 450
              width: 720
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
