import React, {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import SEO from "../components/seo"
import ThemedWrapper from "../components/themedWrapper"
import Page from "../components/page"
import Post from "../components/post"

export default ({ data, location }) => {
  
  const { title, author, description, menuLinks } = useSiteMetadata()
  
  return (
    <ThemedWrapper backgroundColor={'#181C26'}>
      <SEO title={title}/>
      <Page>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Post
          key={node.id} 
          path={`${node.fields.slug}?image=${node.frontmatter.heroImage.name}`}
          author={node.frontmatter.author}
          categories={node.frontmatter.categories}
          date={node.frontmatter.date}
          content={node.html}
          title={node.frontmatter.title}
          heroImage={node.frontmatter.heroImage}
          imageGallery={node.frontmatter.imageGallery}
          vibrantColor={node.frontmatter.heroImage.colors.vibrant}
          lightVibrantColor={node.frontmatter.heroImage.colors.lightVibrant}
        />
      ))}
      </Page>
    </ThemedWrapper>
  )

}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC},
      filter: {
        frontmatter: {contentType: {eq: "post"}
      }}
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
            }
          }
        }
      }
    }
  }
`