import React from "react"
import { Link } from "gatsby"
import { useSiteMetadata } from "../hooks/use-site-metadata"

export default () => {
  const { title, author, description, menuLinks } = useSiteMetadata()

  return (
    <nav className="primary-nav">
      <ul className="primary-nav__links">
        {menuLinks.map((item, index) => (
          <li className="primary-nav__item" key={index}>
            <Link
              className="primary-nav__link"
              activeClassName="primary-nav__link--active"
              to={item.link}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
