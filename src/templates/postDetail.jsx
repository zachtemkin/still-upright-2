import React, {useState, useEffect, useCallback} from "react"
import { Link, navigate, graphql } from "gatsby"
import Img from "gatsby-image"
import withLocation from "../components/withLocation"
import SEO from "../components/seo"
import SiteHeader from "../components/siteHeader"
import ModalNav from "../components/modalNav"
import ThemedWrapper from "../components/themedWrapper"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"


const postDetail = ({ data, search, pageContext }) => {
  const post = data.markdownRemark
  const {next, prev, slug} = pageContext

  const {imageIndex} = search
  const [isModal, setIsModal] = useState()

  const galleryImages = post.frontmatter.imageGallery ? (
    [post.frontmatter.heroImage, ...post.frontmatter.imageGallery]
  ) : (
    [post.frontmatter.heroImage]
  )
  
  const currentImage = !isNaN(imageIndex) && !(imageIndex > galleryImages.length - 1)  ? (
    galleryImages[imageIndex]
  ) : (
    galleryImages[0]
  )

  
  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        <ThemedWrapper backgroundColor='#040507'>
          <div className={`post-detail ${modal ? 'post-detail--modal' : ''}`}>
          
            {modal ? (
              <ModalNav
                color={currentImage.colors.vibrant}
                nextPost={next ? next.fields.slug : null}
                prevPost={prev ? prev.fields.slug : null}
              />
            ) : (
              <SiteHeader />
            )}
            
            <div
              className="post-detail__featured-content-wrapper"
              style={{
                borderColor: currentImage.colors.lightVibrant
              }}
            >
              <div className={`post-detail__info-container ${modal ? 'post-detail__info-container--modal' : ''}`}>
                <hr
                  className="post-detail__info-container__eyebrow"
                  style={{
                    backgroundColor: currentImage.colors.vibrant
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
                      color: currentImage.colors.vibrant
                    }}
                  >
                    {post.frontmatter.author}
                  </span>
                </p>
              </div>
                
              <div className="post-detail__image-container">
                <Img
                  fluid={currentImage.childImageSharp.fluid}
                  backgroundColor={currentImage.colors.vibrant}
                />
              </div>
              
              {post.frontmatter.imageGallery !== null ? ( 
                <div className="post-detail__gallery-wrapper">
                  <ul 
                    className="post-detail__gallery"
                    style={{
                      borderColor: currentImage.colors.vibrant,
                    }}
                  >
                    {galleryImages.map(( image, index ) => (
                      <li 
                        className={`post-detail__gallery__thumbnail ${index === parseInt(imageIndex, 10) ? 'post-detail__gallery__thumbnail--active' : ''}`}
                        key={index}
                      >
                        <Link
                          to={`${slug}?imageIndex=${index}`}
                          state={{
                            modal: modal,
                          }}
                        >
                          <Img
                            fluid={image.childImageSharp.resize}
                            backgroundColor={image.colors.vibrant}
                          />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : ( 
                  ''
              )} 

              {post.html !== "" ? (
                <div
                  className={`post-detail__text-container ${modal ? 'post-detail__text-container--modal' : ''}`}
                  style={{
                    color: currentImage.colors.lightVibrant,
                    borderColor: currentImage.colors.vibrant
                  }}
                  dangerouslySetInnerHTML={{__html: post.html}}
                ></div>
              ) : (
                  ''
              )}
            </div>
            
            {/*{modal ? (
              <ModalNav
                color={currentImage.colors.vibrant}
                nextPost={next ? next.fields.slug : null}
                prevPost={prev ? prev.fields.slug : null}
              />
            ) : (
              ''
            )}*/}

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
            resize(width: 240, height: 135, cropFocus: CENTER, fit: COVER, quality: 100) {
              src
              width
              height
              aspectRatio
            }
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          name
        }
        imageGallery {
          colors {
            ...GatsbyImageColors
          }
          childImageSharp {
            resize(width: 240, height: 135, cropFocus: CENTER, fit: COVER, quality: 100) {
              src
              width
              height
              aspectRatio
            }
            fluid(maxWidth: 1000, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          name
        }
      }
    }
  }
`
 export default withLocation(postDetail)