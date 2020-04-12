import React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
  const { title, author, description, menuLinks } = useSiteMetadata()
  return (
    <div>
      <nav>
        {menuLinks.map((item) => (
          <Link to={item.link}>{item.name}</Link>
        ))}
      </nav>
    </div>
  )
}


