import React from "react"
import { Link } from "gatsby"

export default ( props ) => {
  return (
    <article className="post">
      <Link to={props.path}><span className="post__link" /></Link>
      <h3 className="post__title">{props.title}</h3>
      <p className="post__date">{props.date}</p>
      <p className="post__excerpt">{props.excerpt}</p>
    </article>
  )
}