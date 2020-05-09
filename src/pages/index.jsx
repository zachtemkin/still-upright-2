import React from "react"
import { graphql } from "gatsby"
import LogoSection from "../components/logoSection"
import MainPage from "../templates/mainPage"
import Post from "../components/post"
// import PostFilter from "../components/postFilter"
import SectionHeading from "../components/sectionHeading"
import Footer from "../components/footer"
import PropTypes from "prop-types"

const Index = ({ data, location }) => {
  return (
    <MainPage className="home" pageTitle="Still Upright Dot Com">
      <div className="masthead">
        <h1 className="masthead__heading">
          Still Upright <span>Dot Com</span>
        </h1>
        <p className="masthead__tagline">{"Mostly off since 2015 "}</p>
      </div>
      <LogoSection />
      <section className="page__main-content">
        <SectionHeading title="Recent Work" />
        {data.allMarkdownRemark.edges.map(({ node }, index) => (
          <Post
            key={node.id}
            index={index}
            path={node.fields.slug}
            author={node.frontmatter.author}
            categories={node.frontmatter.categories}
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            heroImage={node.frontmatter.imageGallery[0].image}
            vibrantColor={node.frontmatter.imageGallery[0].image.colors.vibrant}
            lightVibrantColor={
              node.frontmatter.imageGallery[0].image.colors.lightVibrant
            }
            darkVibrantColor={
              node.frontmatter.imageGallery[0].image.colors.darkVibrant
            }
            darkMutedColor={
              node.frontmatter.imageGallery[0].image.colors.darkMuted
            }
          />
        ))}
      </section>
      <Footer/>
    </MainPage>
  )
}

Index.propTypes = {
  data: PropTypes.object,
  location: PropTypes.object,
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
      filter: { frontmatter: { contentType: { eq: "post" } } }
    ) {
      totalCount
      edges {
        node {
          html
          fields {
            slug
          }
          id
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
                  resize(
                    width: 480
                    height: 360
                    cropFocus: ATTENTION
                    quality: 100
                  ) {
                    src
                    width
                    height
                    aspectRatio
                  }
                }
              }
              caption
            }
          }
        }
      }
    }
  }
`
export default Index
