import React from "react"
import PrimaryNav from "../components/primaryNavigation"
import Logo from "../components/logo"

export default ({ children }) => {
  return (
    <header className="site-header">
      <Logo />
      <PrimaryNav />
    </header>
  )
}
