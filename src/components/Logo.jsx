import React from 'react'
import AS from "../assets/AS.png"
function Logo({width = "100px"}) {
  return (
    <img src={AS} alt="logo" width={width} className="rounded-full animate-mymove" />
  )
}

export default Logo