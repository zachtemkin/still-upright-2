import React from "react"
import { graphql } from "gatsby"
import SEO from "../components/seo"
import Img from "gatsby-image"
import SiteHeader from "../components/siteHeader"
import ModalNav from "../components/modalNav"
import ThemedWrapper from "../components/themedWrapper"
import { ModalRoutingContext } from 'gatsby-plugin-modal-routing'

export default ({ data, pageContext }) => {
  const post = data.markdownRemark
  const {next, prev} = pageContext

  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        <ThemedWrapper backgroundColor={'#040507'}>
          <div className={`post-detail ${modal ? 'post-detail--modal' : ''}`}>
          
            {modal ? (
              <ModalNav
                color={post.frontmatter.heroImage.colors.vibrant}
                nextPost={next ? next.fields.slug : null}
                prevPost={prev ? prev.fields.slug : null}
              />
            ) : (
              <SiteHeader />
            )}
            
            <div
              className="post-detail__featured-content-wrapper"
              style={{
                borderColor: post.frontmatter.heroImage.colors.lightVibrant
              }}
            >
              <div className={`post-detail__info-container ${modal ? 'post-detail__info-container--modal' : ''}`}>
                <hr
                  className="post-detail__info-container__eyebrow"
                  style={{
                    backgroundColor: post.frontmatter.heroImage.colors.vibrant
                  }}
                />
                
                <h3 className="post-detail__info-container__post-title">
                  {post.frontmatter.title}
                </h3>
                
                <p className="post-detail__info-container__post-by-line">
                  <span className="post-by-line__date">
                    {`${post.frontmatter.date} by `}
                  </span>
                 
                  <span
                    className="post-by-line__author"
                    style={{
                      color: post.frontmatter.heroImage.colors.vibrant
                    }}
                  >
                    {post.frontmatter.author}
                  </span>
                </p>
              </div>
                
              <div className="post-detail__image-container">
                <Img fluid={post.frontmatter.heroImage.childImageSharp.fluid}></Img>
              </div>
              
              {post.frontmatter.imageGallery !== null ? ( 
                <ul 
                  className="post-detail__gallery"
                  style={{
                    borderColor: post.frontmatter.heroImage.colors.vibrant,
                  }}
                >
                  {post.frontmatter.imageGallery.map(( image, index ) => (
                    <li className="post-detail__gallery__thumbnail" key={index}>
                      <Img fluid={image.childImageSharp.resize} />
                    </li>
                  ))}
                </ul>
              ) : ( 
                  ''
              )} 

              {post.html !== "" ? (
                <div
                  className={`post-detail__text-container ${modal ? 'post-detail__text-container--modal' : ''}`}
                  style={{
                    color: post.frontmatter.heroImage.colors.lightVibrant,
                    borderColor: post.frontmatter.heroImage.colors.vibrant
                  }}
                  dangerouslySetInnerHTML={{__html: post.html}}
                ></div>
              ) : (
                  ''
              )}
            </div>
            
            {modal ? (
              <ModalNav
                color={post.frontmatter.heroImage.colors.vibrant}
                nextPost={next ? next.fields.slug : null}
                prevPost={prev ? prev.fields.slug : null}
              />
            ) : (
              ''
            )}

          </div>
        </ThemedWrapper>

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
        heroImage {
          colors {
            ...GatsbyImageColors
          }
          childImageSharp {
            resize(width: 480, height: 480, cropFocus: CENTER, quality: 100) {
              src
              width
              height
              aspectRatio
            }
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        imageGallery {
          childImageSharp {
            resize(width: 240, height: 135, cropFocus: CENTER, fit: COVER, quality: 100) {
              src
              width
              height
              aspectRatio
            }
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`
      