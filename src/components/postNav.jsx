import React from "react"
import { Link } from "gatsby"

export default props => {
  return (
    <nav className="post-nav">
      {props.prevPost ? (
        <Link
          to={props.prevPost}
          state={{
            modal: false,
          }}
          className="post-nav__button post-nav__button--prev"
          style={{ color: props.color, borderColor: props.color }}
        >
          Previous
        </Link>
      ) : (
        <p
          className="post-nav__button post-nav__button--disabled"
          style={{ color: props.color }}
        >
          Previous
        </p>
      )}

      <Link
        to={props.closeTo}
        state={{
          modal: false,
        }}
        className="post-nav__button post-nav__button--close"
        style={{ color: props.color, borderColor: props.color }}
      >
        Close
      </Link>

      {props.nextPost ? (
        <Link
          to={props.nextPost}
          state={{
            modal: false,
          }}
          className="post-nav__button post-nav__button--next"
          style={{ color: props.color, borderColor: props.color }}
        >
          Next
        </Link>
      ) : (
        <p
          className="post-nav__button post-nav__button--disabled"
          style={{ color: props.color }}
        >
          Next
        </p>
      )}
    </nav>
  )
}
