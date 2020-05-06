import React from "react"
import MainPage from "../templates/mainPage"
import SectionHeading from "../components/sectionHeading"

const Shop = () => {
  return (
    <MainPage className="shop" pageTitle="Shop">
      <section className="page__main-content">
        <SectionHeading title="Shop" />
      </section>
    </MainPage>
  )
}

export default Shop
