import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"

const PostNav = (props) => {
  return (
    <nav className="post-nav">
      {props.prevPost ? (
        <Link
          to={props.prevPost}
          className="su-button post-nav__button post-nav__button--prev"
          style={{ color: props.color, borderColor: props.color }}
        >
          Prev
        </Link>
      ) : (
        <p
          className="su-button post-nav__button post-nav__button--disabled"
          style={{ color: props.color }}
        >
          Prev
        </p>
      )}

      <Link
        to={props.closeTo}
        className="su-button post-nav__button post-nav__button--close"
      >
        Home
      </Link>

      {props.nextPost ? (
        <Link
          to={props.nextPost}
          className="su-button post-nav__button post-nav__button--next"
          style={{ color: props.color, borderColor: props.color }}
        >
          Next
        </Link>
      ) : (
        <p
          className="su-button post-nav__button post-nav__button--disabled"
          style={{ color: props.color }}
        >
          Next
        </p>
      )}
    </nav>
  )
}

PostNav.propTypes = {
  color: PropTypes.string,
  nextPost: PropTypes.string,
  prevPost: PropTypes.string,
  closeTo: PropTypes.string,
}

export default PostNav
