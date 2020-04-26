import React from "react"
import PrimaryNav from "../components/primaryNavigation"
import SiteHeader from "../components/siteHeader"

export default ({ children }) => {
  return (
    <>
      <SiteHeader />
      <div className="page">{children}</div>
    </>
  )
}
