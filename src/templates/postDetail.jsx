import React, {useState, useEffect} from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"
import withLocation from "../components/withLocation"
import SiteHeader from "../components/siteHeader"
import ModalNav from "../components/modalNav"
import ThemedWrapper from "../components/themedWrapper"
import Gallery from "../components/gallery"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing"


const PostDetail = ({ data, location, search, pageContext }) => {

  const defaultQueryString = !isNaN(search.imageIndex) ? search.imageIndex : 0
  
  const [currentImageIndex, setCurrentImageIndex] = useState(parseInt(defaultQueryString, 10))

  const frontmatter = data.markdownRemark.frontmatter
  const {next, prev, slug} = pageContext
  const nextPost = next ? next.fields.slug : null
  const prevPost = prev ? prev.fields.slug : null

  const heroImage = frontmatter.heroImage
  const postHasGallery = frontmatter.imageGallery !== null
  const galleryImages = postHasGallery ? [heroImage, ...frontmatter.imageGallery] : [heroImage]
  
  const currentImage =
    !isNaN(currentImageIndex) &&
    !(currentImageIndex > galleryImages.length - 1) 
      ? galleryImages[currentImageIndex]
      : heroImage

  const vibrantColor = currentImage.colors.vibrant
  const lightVibrantColor = currentImage.colors.lightVibrant

  const newUrl = `${slug}?imageIndex=${currentImageIndex}`
  typeof window && window.history.pushState({ path: newUrl }, "", newUrl)
  
  const handleClick = (index) => {
    setCurrentImageIndex(index)
  } 


  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) => (
        
        <ThemedWrapper backgroundColor='#040507'>
          <div className={'post-detail' + (modal ? ' post-detail--modal' : '')}>
          
            {modal ? (
              <ModalNav
                color={vibrantColor}
                nextPost={nextPost}
                prevPost={prevPost}
              />
            ) : (
              <SiteHeader />
            )}
            
            <div
              className="post-detail__featured-content-wrapper"
              style={{
                borderColor: lightVibrantColor
              }}
            >
              <div className={'post-detail__info-container' + (modal ? ' post-detail__info-container--modal' : '')}>
                <hr
                  className="post-detail__info-container__eyebrow"
                  style={{
                    backgroundColor: vibrantColor
                  }}
                />
                
                <h3 className="post-detail__info-container__post-title">{frontmatter.title}</h3>
                
                <p className="post-detail__info-container__post-by-line">
                  <span className="post-by-line__date">{frontmatter.date} by</span>
                 
                  <span
                    className="post-by-line__author"
                    style={{
                      color: vibrantColor
                    }}
                  >
                    {frontmatter.author}
                  </span>
                </p>
              </div>
                
              <div className="post-detail__image-container">
                <Img
                  fluid={currentImage.childImageSharp.preview}
                  backgroundColor={vibrantColor}
                />
              </div>
              
              {postHasGallery && (
                <Gallery
                  images={galleryImages}
                  activeThumb={currentImageIndex}
                  onClick={handleClick}
                />
              )}

              {data.markdownRemark.html && (
                <div
                  className={'post-detail__text-container' + (modal ? ' post-detail__text-container--modal' : '')}
                  style={{
                    color: currentImage.colors.lightVibrant,
                    borderColor: currentImage.colors.vibrant
                  }}
                  dangerouslySetInnerHTML={{__html: data.markdownRemark.html}}
                ></div>
              )}
            </div>
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
            thumbnail: resize(width: 240, height: 135, cropFocus: CENTER, fit: COVER, quality: 100) {
              src
              width
              aspectRatio
            }
            preview: fluid(maxHeight: 450, maxWidth: 700, cropFocus: CENTER, fit: CONTAIN, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            } 
            full: fluid(maxWidth: 700, fit: CONTAIN quality: 100) {
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
            thumbnail: resize(width: 240, height: 135, cropFocus: CENTER, fit: COVER, quality: 100) {
              src
              width
              aspectRatio
            }
            preview: fluid(maxHeight: 450, maxWidth: 700, cropFocus: CENTER, fit: CONTAIN, quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            } 
            full: fluid(maxWidth: 700, fit: CONTAIN quality: 100) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
          name
        }
      }
    }
  }
`
export default withLocation(PostDetail)