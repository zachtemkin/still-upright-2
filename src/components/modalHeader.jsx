import React from "react"
import { Link } from "gatsby"

export default ( props ) => {
  
  return (
    <header className="modal-header">
      <nav className="modal-header__nav">
        <div className="modal-header__nav__prev-next-buttons">
          {props.prevPost ? (
            <Link
              to={props.prevPost}
              state={{
                modal: true
              }}
              className="modal-header__nav__button modal-header__nav__button--prev"
              style={{color: props.color, borderColor: props.color}}
            >
              Previous
            </Link>
          ) : (
            <p
              className="modal-header__nav__button modal-header__nav__button--disabled"
              style={{color: props.color}}
            >
              Previous
            </p>
          )}

          {props.nextPost ? (
            <Link
              to={props.nextPost}
              state={{
                modal: true
              }}
              className="modal-header__nav__button modal-header__nav__button--next"
              style={{color: props.color, borderColor: props.color}}
            >
              Next
            </Link>
          ) : (
            <p
              className="modal-header__nav__button modal-header__nav__button--disabled"
              style={{color: props.color}}
            >
              Next
            </p>
          )}
        </div>
        
        <Link
          to="/"
          className="modal-header__nav__button modal-header__nav__button--close"
          style={{color: props.color, borderColor: props.color}}
        >
          Close
        </Link>
      </nav>
    </header>
  )
}