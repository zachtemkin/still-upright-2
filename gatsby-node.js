const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `src/` })

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              imageGallery {
                name
              }
            }
          }
        }
      }
    }
  `)

  const results = result.data.allMarkdownRemark.edges
  results.forEach(({ node }, index) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/postDetail.jsx`),
      context: {
        slug: node.fields.slug,
        prev: index === 0 ? null : results[index - 1].node,
        next: index === results.length - 1 ? null : results[index + 1].node,
      },
    })

    const gallery = [node.frontmatter.imageGallery]
    gallery.forEach((image, index) => {
      createPage({
        path: node.fields.slug + "fullSize/" + image.name,
        component: path.resolve(`./src/templates/imageDetail.jsx`),
        context: {
          slug: node.fields.slug + "fullSize/" + image.name,
        },
      })
    })
  })
}
