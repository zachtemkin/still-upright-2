import React, { useState, useEffect } from "react"

export default props => {
  return (
    <div
      className="themed-wrapper"
      style={{ backgroundColor: props.backgroundColor }}
    >
      {props.children}
    </div>
  )
}
