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
        excerpt={node.excerpt}
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
        frontmatter: {contentType: {eq: "post"},
        # heroImage: {id: {ne: null}}
      }}
    ) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          excerpt(truncate: true)
          frontmatter {
            author
            category
            date(fromNow: true)
            heroImage {
              colors {
                ...GatsbyImageColors
              }
              childImageSharp {
                resize(width: 500, height: 500, cropFocus: ATTENTION, quality: 75) {
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