import React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
  const { title, author, description, menuLinks } = useSiteMetadata()
  return (
    <nav className="primary-nav">
      {menuLinks.map((item) => (
        <Link className="primary-nav__link" to={item.link}>{item.name}</Link>
      ))}
    </nav>
  )
}


