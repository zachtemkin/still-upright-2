import React from "react"
import MainPage from "../templates/mainPage"
import SectionHeading from "../components/sectionHeading"

const StillUprightRadio = () => (
  <MainPage>
    <section className="page__main-content" pageTitle="Still Upright Radio">
      <SectionHeading title="Still Upright Radio" />
      <iframe title="Radio Free Jesse" src="https://open.spotify.com/embed/playlist/4JTRQ20knJuuv0GC8EASNQ" width="300" height="380" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
      <iframe title="Jesse's Album of the Week" src="https://open.spotify.com/embed/playlist/7mF5vaveBNd3wp5HfqZWyL" width="300" height="380" frameBorder="0" allowTransparency="true" allow="encrypted-media"></iframe>
    </section>
  </MainPage>
)

export default StillUprightRadio

