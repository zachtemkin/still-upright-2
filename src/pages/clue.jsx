import React, { useState } from "react"
// import MainPage from "../templates/mainPage"
import SectionHeading from "../components/sectionHeading"

const Clue = () => {
  const rooms = [
    "Ball Room",
    "Billiard Room",
    "Conservatory",
    "Dining Room",
    "Hall",
    "Kitchen",
    "Lounge",
    "Library",
    "Study",
  ]

  const weapons = [
    "knife",
    "revolver",
    "rope",
    "wrench",
    "candlestick",
    "lead pipe",
  ]

  const people = [
    "Mrs. White",
    "Mrs. Peacock",
    "Professor Plum",
    "Colonel Mustard",
    "Miss Scarlett",
    "Reverend Green",
    "Mr. Boddy",
  ]

  const RandomRoom = rooms[Math.floor(Math.random() * rooms.length)]
  const RandomWeapon = weapons[Math.floor(Math.random() * weapons.length)]
  const RandomPerson = people[Math.floor(Math.random() * people.length)]

  const randomThings = [RandomRoom, RandomWeapon, RandomPerson]

  const [isHidden, setIsHidden] = useState(true)

  // useEffect(() => {
  //   setRandomThings([RandomRoom, RandomWeapon, RandomPerson])
  // },[randomThings, RandomRoom, RandomWeapon, RandomPerson])

  const reveal = () => {
    isHidden ? setIsHidden(false) : setIsHidden(true)
  }

  return (
    <div>
      <SectionHeading title="Clue" />
      {randomThings.map((thing, index) => (
        <h1
          className={"clue" + (isHidden ? " clue--hidden" : "")}
          onClick={reveal}
          key="index"
        >
          {thing}
        </h1>
      ))}
    </div>
  )
}

export default Clue
