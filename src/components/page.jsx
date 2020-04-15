import React from "react"
import PrimaryNav from "../components/primaryNavigation"
import Logo from "../components/logo"

export default ({ children }) => {
  
  return (
    <div className="page">
      <header className="page__header">
        <Logo />
        <PrimaryNav />
      </header>
      <main className="page__main-content">
        {children}
      </main>
    </div>
  )
}