import React from "react"
import PrimaryNav from "../components/primaryNavigation"

export default ({ children }) => {
  return (
    <header className="site-header">
      <div className="site-header__grid">
        <div className="site-header__wrapper">
          <PrimaryNav />
        </div>
      </div>
    </header>
  )
}
