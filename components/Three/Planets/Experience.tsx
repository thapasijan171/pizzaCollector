import { useEffect, useState, useRef } from 'react'
import Instrucciones from '../Instrucciones/Instrucciones'
import { ThreeExperience } from './TheeExperience'

interface ExperienceProps {
  title: string
}

export default function Experience({ title }: ExperienceProps) {
  const [scene, setScene] = useState<ThreeExperience>(new ThreeExperience())
  const sceneContainer = useRef(null)

  useEffect(() => {
    const container: HTMLElement | null = sceneContainer.current
    scene.initScene()
    scene.loadModel(title)

    return () => {
      scene.removeARButton()
      scene.disposeScene()
    }
  }, [])

  return (
    <>
      <Instrucciones />
      <div className="container">
        <div className="wrapper">
          <div className="experience_scene_title">
            <h1 className="planet_title">{title}</h1>
          </div>
          <div
            id="experience_scene_id"
            className="experience_scene_container"
            ref={sceneContainer}
          ></div>
        </div>
      </div>
    </>
  )
}
