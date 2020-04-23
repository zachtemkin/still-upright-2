import React, {useState, useEffect} from "react"
import { Link, graphql } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"
import SEO from "../components/seo"
import ThemedWrapper from "../components/themedWrapper"
import Page from "../components/page"
import Post from "../components/post"
import PostFilter from "../components/postFilter"

export default ({ data, location }) => {
  
  const { title, author, description, menuLinks } = useSiteMetadata()

  return (
    <ThemedWrapper backgroundColor={'#181C26'}>
      <SEO title={title}/>
      <Page>
        <div className="page__main-content">
          <PostFilter data={data}/>
        {data.allMarkdownRemark.edges.map(({ node }, index) => (
          <Post
            key={node.id}
            index={index}
            path={`${node.fields.slug}?imageIndex=0`}
            author={node.frontmatter.author}
            categories={node.frontmatter.categories}
            date={node.frontmatter.date}
            title={node.frontmatter.title}
            heroImage={node.frontmatter.heroImage}
            vibrantColor={node.frontmatter.heroImage.colors.vibrant}
            lightVibrantColor={node.frontmatter.heroImage.colors.lightVibrant}
          />
        ))}
        </div>
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
              }
              name
            }
          }
        }
      }
    }
  }
`