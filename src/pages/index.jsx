import React from "react"
import { Link, graphql } from "gatsby"
import Page from "../components/page"
import Row from "../components/row"
import Post from "../components/post"
// import Grid from "../components/grid"

export default ({ data }) => {
  return (
    <Page>
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
          title={node.frontmatter.title}
          date={node.frontmatter.date}
          path={node.fields.slug}
          excerpt={node.excerpt}
        />
      ))}
      </Row>
    </Page>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark(sort: {fields: frontmatter___date, order: DESC}, filter: {frontmatter: {page: {ne: true}}}) {
      totalCount
      edges {
        node {
          fields {
            slug
          }
          id
          frontmatter {
            date(fromNow: true)
            title
          }
          excerpt(truncate: true)
        }
      }
    }
  }
`