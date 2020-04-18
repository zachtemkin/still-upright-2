import React from "react"
import { Link } from "gatsby"

export default ( props ) => {
  
  return (
    <nav className="modal-nav">
      <div className="modal-nav__wrapper">
        <div className="modal-nav__prev-next-buttons">
          {props.prevPost ? (
            <Link
              to={props.prevPost}
              state={{
                modal: true
              }}
              className="modal-nav__button modal-nav__button--prev"
              style={{color: props.color, borderColor: props.color}}
            >
              Previous
            </Link>
          ) : (
            <p
              className="modal-nav__button modal-nav__button--disabled"
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
              className="modal-nav__button modal-nav__button--next"
              style={{color: props.color, borderColor: props.color}}
            >
              Next
            </Link>
          ) : (
            <p
              className="modal-nav__button modal-nav__button--disabled"
              style={{color: props.color}}
            >
              Next
            </p>
          )}
        </div>
        
        <Link
          to="/"
          className="modal-nav__button modal-nav__button--close"
          style={{color: props.color, borderColor: props.color}}
        >
          Close
        </Link>
      </div>
    </nav>
  )
}