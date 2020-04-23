import React from "react"
import PrimaryNav from "../components/primaryNavigation"
import Logo from "../components/logo"
import SiteHeader from "../components/siteHeader"

export default ({ children }) => {
  return (
    <div className="page">
      <SiteHeader />
      {children}
    </div>
  )
}
