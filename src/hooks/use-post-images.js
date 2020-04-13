import { useStaticQuery, graphql } from "gatsby"

export const usePostImages = () => {
  const { post } = useStaticQuery(
    graphql`
      query {
        file(relativePath: { eq: "images/default.jpg" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    `
  )
}