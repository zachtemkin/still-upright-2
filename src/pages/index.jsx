import React, { useState, useEffect } from "react"
import { Link, graphql } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import SEO from "../components/seo"
import ThemedWrapper from "../components/themedWrapper"
import LogoSection from "../components/logoSection"
import Page from "../components/page"
import Post from "../components/post"
import PostFilter from "../components/postFilter"

export default ({ data, location }) => {
  const { title, author, description, menuLinks } = useSiteMetadata()

  return (
    <Page>
      <SEO title={title} />
      <div className="page-header">
        <h1 className="page-header__heading">
          Still Upright <span>Dot Com</span>
        </h1>
        <p className="page-header__tagline">Mostly off since 2015</p>
      </div>
      <LogoSection />
      <div className="page__main-content">
        <h1 className="post-heading">Recent Work</h1>
        <PostFilter data={data} />
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
            hoverImage={node.frontmatter.imageGallery[0].image}
            vibrantColor={node.frontmatter.imageGallery[0].image.colors.vibrant}
            lightVibrantColor={
              node.frontmatter.imageGallery[0].image.colors.lightVibrant
            }
          />
        ))}
      </div>
    </Page>
  )
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
                    cropFocus: CENTER
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
