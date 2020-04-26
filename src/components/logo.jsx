import React from "react"
import SnakeUpright from "../assets/images/snake-upright.svg"

export default () => {
  return (
    <div className="logo-container">
      <div className="logo-container__logo">
        <img src={SnakeUpright} alt="" />
      </div>
      <p className="logo-container__logo-label">Logo Of The Minute</p>
    </div>
  )
}
