import React from "react"
import { Link, graphql } from "gatsby"
import Page from "../components/page"

export default ({ data }) => {
  return (
    <Page>
      <h1>Hello World</h1>
      <h2>I'm coming together</h2>
      {data.allMarkdownRemark.edges.map(({ node }, index) => (
        <div key={index}>
          <h3>{node.frontmatter.title}</h3>
        </div>
      ))}
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