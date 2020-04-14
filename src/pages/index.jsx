import React from "react"
import { Link, graphql } from "gatsby"
import Page from "../components/page"
import Row from "../components/row"
import Post from "../components/post"
import Grid from "../components/grid"

export default ({ data }) => {
  return (
    <Page>
      {/*<Grid/>*/}
      <Row>
        <h1>Hello World</h1>
      </Row>
      
      <Row>
        <h2>I'm coming together</h2>
      </Row>
      
      <Row>
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
      </Row>
    </Page>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(
      sort: {fields: frontmatter___date, order: DESC},
      filter: {frontmatter: {contentType: {eq: "post"}}}
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