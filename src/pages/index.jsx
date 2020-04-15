import React from "react"
import { Link, graphql } from "gatsby"
import Page from "../components/page"
import Post from "../components/post"

export default ({ data }) => {
  
  return (
    <Page>
    {data.allMarkdownRemark.edges.map(({ node }, index) => (
      <Post
        key={node.id} 
        path={node.fields.slug}
        author={node.frontmatter.author}
        category={node.frontmatter.category}
        date={node.frontmatter.date}
        title={node.frontmatter.title}
        heroImage={node.frontmatter.heroImage}
      />
    ))}
    </Page>
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
          fields {
            slug
          }
          id
          frontmatter {
            author
            category
            date(fromNow: true)
            heroImage {
              colors {
                ...GatsbyImageColors
              }
              childImageSharp {
                resize(width: 480, height: 480, cropFocus: ATTENTION, quality: 100) {
                  src
                  width
                  height
                  aspectRatio
                }
                fluid(maxWidth: 500, quality: 75) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            title
          }
        }
      }
    }
  }
`