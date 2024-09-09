import { useRef } from 'react'

export default function Instrucciones() {
  const instruccionesContainer = useRef(null)

  const HiddeModal = () => {
    const container = document.getElementById('modal_button')
    container?.classList.toggle('instrucciones_container--none')
  }

  return (
    <div
      id="modal_button"
      className="container instrucciones_container"
      ref={instruccionesContainer}
    >
      <div className="wrapper instrucciones_wrapper">
        <div className="instrucciones_pasos">
          <h1>Instructions</h1>
          <p>When you enter AR mode, follow these instructions:</p>
          <ul>
            <li>
              <b>1</b> - In AR mode, point your phone's camera at the floor
            </li>
            <li>
              <b>2</b> - Wait for a white reticle to appear
            </li>
            <li>
              <b>3</b> - Move the reticle to the spot where you want the planet to appear
            </li>
            <li>
              <b>4</b> - Tap the screen, and voila!
            </li>
            <li>
              <b>5</b> - Take a screenshot to save the result
            </li>
          </ul>

          <div className="instrucciones_button">
            <button onClick={() => HiddeModal()}>Entendido</button>
          </div>
        </div>
      </div>
    </div>
  )
}
