import { useEffect, useState } from 'react'
import { ARGalaxyExperience } from './GalaxyExperience'

export default function Galaxy() {
  const ARExperience = new ARGalaxyExperience()

  useEffect(() => {
    ARExperience.InitScene()
    ARExperience.GenerateGalaxyTweaks()
    ARExperience.GenerateGalaxy()
    return () => {
      ARExperience.removeARButton()
      ARExperience.CleanUpScene()
    }
  }, [])
  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="experience_scene_title">
            <h1 className="planet_title">Galaxia</h1>
          </div>
          <div
            id="scene-container"
            className="experience_scene_container"
          ></div>
        </div>
      </div>
    </>
  )
}
