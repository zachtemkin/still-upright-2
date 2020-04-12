import React from "react"
import PrimaryNav from "../components/primaryNavigation"

export default ({ children }) => (
  <div className="page">
  	<PrimaryNav/>
  	<main className="page__main-content">
	  	{children}
  	</main>
  </div>
)