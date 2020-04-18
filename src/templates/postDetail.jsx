import React, {useState, useEffect} from "react"
import { Link, navigate, graphql } from "gatsby"
import Img from "gatsby-image"

import useQueryString from "../hooks/useQueryString"
import SEO from "../components/seo"
import SiteHeader from "../components/siteHeader"
import ModalNav from "../components/modalNav"
import ThemedWrapper from "../components/themedWrapper"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"


const postDetail = ({ data, pageContext }) => {
  const post = data.markdownRemark
  const {next, prev, slug} = pageContext

  const [imageIndex, onSetImageIndex] = useQueryString('image', 0); 
  const [isModal, setIsModal] = useState()

  const handleClick = (e, index, modal) => {
    e.preventDefault()
    onSetImageIndex(index)
  }

  const galleryImages = [post.frontmatter.heroImage, ...post.frontmatter.imageGallery]
  const currentImage = galleryImages[imageIndex].childImageSharp.fluid

  
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
                <Img fluid={currentImage}></Img>
              </div>
              
              {post.frontmatter.imageGallery !== null ? ( 
                <ul 
                  className="post-detail__gallery"
                  style={{
                    borderColor: post.frontmatter.heroImage.colors.vibrant,
                  }}
                >
                  {galleryImages.map(( image, index ) => (
                    <li className="post-detail__gallery__thumbnail" key={index}>
                      <Link
                        to={`${slug}`}
                        onClick={(e) => handleClick(e, index)}
                        state={{
                          modal: modal
                        }}
                      >
                        <Img fluid={image.childImageSharp.resize} />
                      </Link>
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
          name
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
          name
        }
      }
    }
  }
`
 export default postDetail