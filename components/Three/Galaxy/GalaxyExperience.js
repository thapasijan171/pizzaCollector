import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { ARButton } from '../Planets/ARButton'
import { Vertex } from './Shaders/Vertex'
import { Fragment } from './Shaders/Fragment'

class ARGalaxyExperience {
  constructor() {
    /* Container */
    this.container = document.createElement('div')

    /* Scene and camera */
    this.camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x1e1e1e)

    this.camera.position.set(10, 10, 10)
    this.scene.add(this.camera)

    /* Renderer */
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antilias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.renderer.setAnimationLoop(this.Render.bind(this))
    this.container.appendChild(this.renderer.domElement)
    this.renderer.setPixelRatio(1)

    /* Clock */
    this.Clock = new THREE.Clock()

    /* Controls */
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.minDistance = 5
    this.controls.maxDistance = 20
    this.controls.enablePan = false

    /* Resize */
    window.addEventListener('resize', () => this.Resize())

    /* Debugger */
    // this.gui = new dat.GUI({ width: 600, closed: true })
    this.GalaxyParameters = {}

    /* Galaxy Variables */
    this.GalaxyStarParticles = null
    this.GalaxyParticlesGeometry = null
    this.GalaxyParticlesMaterial = null

    /* AR SETUP */
    this.setupARExperience()

    //   Add reticle
    this.reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI * 0.5),
      new THREE.MeshBasicMaterial()
    )

    this.reticle.matrixAutoUpdate = false
    this.reticle.visible = false
    this.scene.add(this.reticle)

    this.pivot = new THREE.Object3D()
    this.pivot.position.set(0, 0, 0)
  }

  InitScene() {
    document.getElementById('scene-container').appendChild(this.container)
    const ARButton = document.getElementById('ar_button_id')
    ARButton.addEventListener('click', () => {
      if (ARButton.classList.contains('ARButtonEndSession')) {
        this.GalaxyStarParticles.visible = true
      } else {
        this.GalaxyStarParticles.visible = false
        this.scene.background = null
      }
    })
  }

  GenerateGalaxy() {
    /* 
      Testing if there is someting in the Galaxy params
      Geometry, Material and Particles
    */
    if (this.GalaxyStarParticles !== null) {
      this.GalaxyParticlesGeometry.dispose()
      this.GalaxyParticlesMaterial.dispose()
      this.scene.remove(this.GalaxyStarParticles)
    }

    /* Galaxy Geometry */
    this.GalaxyParticlesGeometry = new THREE.BufferGeometry()
    this.GalaxyParticlesPositions = new Float32Array(
      this.GalaxyParameters.StarCount * 3
    )
    this.GalaxyParticlesScale = new Float32Array(
      this.GalaxyParameters.StarCount * 1
    )
    this.GalaxyParticlesRandomness = new Float32Array(
      this.GalaxyParameters.StarCount * 3
    )

    /* Galaxy Colors */
    this.GalaxyParticlesColors = new Float32Array(
      this.GalaxyParameters.StarCount * 3
    )

    for (let i = 0; i < this.GalaxyParameters.StarCount; i++) {
      const index3 = i * 3

      /* ---------------------------- POSITIONS ------------------- */
      /* Galaxy with 3 branches (minimus) */
      const randomRadius = Math.random() * this.GalaxyParameters.GalaxyRadius
      const branchAngle =
        ((i % this.GalaxyParameters.GalaxyBrances) /
          this.GalaxyParameters.GalaxyBrances) *
        Math.PI *
        2

      /* Angulo de vertex */
      const branchSpingAngle = randomRadius * this.GalaxyParameters.GalaxySpin

      /* x pos */
      this.GalaxyParticlesPositions[index3 + 0] =
        Math.cos(branchAngle + branchSpingAngle) * randomRadius

      /* y pos */
      this.GalaxyParticlesPositions[index3 + 1] = 0

      /* z pos */
      this.GalaxyParticlesPositions[index3 + 2] =
        Math.sin(branchAngle + branchSpingAngle) * randomRadius

      /*  RANDOMNESS OF THE BRANCHES */
      /* Posicionamiento random del vertex acorde de que tan cerca esta del centro */
      const branchRandomnessX =
        Math.pow(Math.random(), this.GalaxyParameters.GalaxyRandomnessPower) *
        (Math.random() < 0.5 ? 1 : -1)
      const branchRandomnessY =
        Math.pow(Math.random(), this.GalaxyParameters.GalaxyRandomnessPower) *
        (Math.random() < 0.5 ? 1 : -1)
      const branchRandomnessZ =
        Math.pow(Math.random(), this.GalaxyParameters.GalaxyRandomnessPower) *
        (Math.random() < 0.5 ? 1 : -1)

      this.GalaxyParticlesRandomness[index3 + 0] = branchRandomnessX
      this.GalaxyParticlesRandomness[index3 + 1] = branchRandomnessY
      this.GalaxyParticlesRandomness[index3 + 2] = branchRandomnessZ

      /* ------------- SCALES ---------------------- */
      this.GalaxyParticlesScale[i] = Math.random()

      /* ------------- COLORS ---------------------- */
      const ColorInside = new THREE.Color(
        this.GalaxyParameters.GalaxyInsideColor
      )
      const ColorOutsize = new THREE.Color(
        this.GalaxyParameters.GalaxyOutsideColor
      )
      const ColorMix = ColorInside.clone()
      ColorMix.lerp(
        ColorOutsize,
        randomRadius / this.GalaxyParameters.GalaxyRadius
      )

      this.GalaxyParticlesColors[index3 + 0] = ColorMix.r
      this.GalaxyParticlesColors[index3 + 1] = ColorMix.g
      this.GalaxyParticlesColors[index3 + 2] = ColorMix.b
    }

    this.GalaxyParticlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(this.GalaxyParticlesPositions, 3)
    )

    this.GalaxyParticlesGeometry.setAttribute(
      'aScale',
      new THREE.BufferAttribute(this.GalaxyParticlesScale, 1)
    )

    this.GalaxyParticlesGeometry.setAttribute(
      'color',
      new THREE.BufferAttribute(this.GalaxyParticlesColors, 3)
    )

    this.GalaxyParticlesGeometry.setAttribute(
      'aRandomness',
      new THREE.BufferAttribute(this.GalaxyParticlesRandomness, 3)
    )

    /* -----------MATERIAL-------------- */
    /* Galaxy Material */
    this.GalaxyParticlesMaterial = new THREE.ShaderMaterial({
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      fragmentShader: Fragment,
      vertexShader: Vertex,
      transparent: true,
      uniforms: {
        uOriginX: { value: 0.0 },
        uOriginZ: { value: 0.0 },
        uOriginY: { value: 0.0 },
        uTime: { value: 0.0 },
        uStartSize: { value: 30.0 * this.renderer.getPixelRatio() },
        sizeAttenuation: { value: true },
        uColor: { value: new THREE.Color(0xff00ff) },
      },
    })

    /* Galaxy Mesh(Points) */
    this.GalaxyStarParticles = new THREE.Points(
      this.GalaxyParticlesGeometry,
      this.GalaxyParticlesMaterial
    )
    this.scene.add(this.GalaxyStarParticles)
  }

  GenerateGalaxyTweaks() {
    /* Start count */
    this.GalaxyParameters.StarCount = 90000
    // this.gui
    //   .add(this.GalaxyParameters, 'StarCount', 4000, 100000, 100)
    //   .name('No. de Estrellas')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    /* Start Size */
    this.GalaxyParameters.StarSize = 0.02
    // this.gui
    //   .add(this.GalaxyParameters, 'StarSize', 1, 12, 1)
    //   .name('Tamanio de las estrellas')
    //   .onFinishChange((val) => {
    //     if (this.GalaxyParticlesMaterial) {
    //       this.GalaxyParticlesMaterial.uniforms.uStartSize.value = val
    //     }
    //   })

    /* Galaxy Radius */
    this.GalaxyParameters.GalaxyRadius = 4
    // this.gui
    //   .add(this.GalaxyParameters, 'GalaxyRadius', 3, 5, 0.001)
    //   .name('Radio de la Galaxia')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    /* Galaxy Branches */
    this.GalaxyParameters.GalaxyBrances = 7
    // this.gui
    //   .add(this.GalaxyParameters, 'GalaxyBrances', 2, 8, 1)
    //   .name('No. de ramas de la galaxia')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    /* Galaxy Spin */
    this.GalaxyParameters.GalaxySpin = 1.939
    // this.gui
    //   .add(this.GalaxyParameters, 'GalaxySpin', -5, 5, 0.001)
    //   .name('Rotacion de la Galaxia')
    //   .onChange(this.GenerateGalaxy.bind(this))

    /* Galaxy Randomness */
    this.GalaxyParameters.GalaxyBranchRandomness = 0.2
    // this.gui
    //   .add(this.GalaxyParameters, 'GalaxyBranchRandomness', 0.02, 1, 0.01)
    //   .name('Valor de dispersion de las ramas')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    /* Galaxy Randomness Power */
    this.GalaxyParameters.GalaxyRandomnessPower = 7
    // this.gui
    //   .add(this.GalaxyParameters, 'GalaxyRandomnessPower', 2, 15, 0.001)
    //   .name('Valor de Dispersion de la Galaxia')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    /* Inside color */
    // this.GalaxyParameters.GalaxyInsideColor = 0xff00ff
    this.GalaxyParameters.GalaxyInsideColor = 0xff6030
    // this.gui
    //   .addColor(this.GalaxyParameters, 'GalaxyInsideColor')
    //   .name('Color Interior')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    /* Outside color */
    // this.GalaxyParameters.GalaxyOutsideColor = 0x0000ff
    this.GalaxyParameters.GalaxyOutsideColor = 0x1b3984
    // this.gui
    //   .addColor(this.GalaxyParameters, 'GalaxyOutsideColor')
    //   .name('Color Exterior')
    //   .onFinishChange(this.GenerateGalaxy.bind(this))

    // this.gui.add(this.pivot.position, 'x', -5, 5, 0.5).onChange((value) => {
    //   console.log(this.pivot.position)
    //   this.pivot.position.x = value
    // })
  }

  ShaderGalaxy() {
    this.planeShaderMaterial = new THREE.ShaderMaterial({
      side: THREE.DoubleSide,
      vertexShader: Vertex,
      fragmentShader: Fragment,
    })
    this.planeShaderGeometry = new THREE.PlaneGeometry(1, 1)
    this.planeShader = new THREE.Mesh(
      this.planeShaderGeometry,
      this.planeShaderMaterial
    )
    this.planeShader.rotation.x = Math.PI * -0.5
    this.scene.add(this.planeShader)
  }

  /* AR SETUP */
  setupARExperience() {
    this.renderer.xr.enabled = true

    new ARButton(this.renderer, {
      sessionInit: {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: document.body },
      },
    })

    this.hitTestSourceRequested = false //target
    this.hitTestSource = null //origin

    const onSelect = () => {
      if (this.reticle.visible) {
        this.GalaxyStarParticles.visible = true
        this.pivot.position.setFromMatrixPosition(this.reticle.matrix)
        this.pivot.quaternion.setFromRotationMatrix(this.reticle.matrix)
      }
    }

    // this controller
    this.controller = this.renderer.xr.getController(0)
    this.scene.add(this.controller)
    this.controller.addEventListener('select', () => {
      onSelect()
    })
  }

  /* Renmove AR Button */
  removeARButton() {
    const arButton = document.getElementById('ar_button_id')
    if (arButton) {
      document.body.removeChild(arButton)
    }
  }

  //Origin
  requestHitTestSource() {
    const session = this.renderer.xr.getSession()

    session.requestReferenceSpace('viewer').then((referenceSpace) => {
      session.requestHitTestSource({ space: referenceSpace }).then((source) => {
        this.hitTestSource = source
      })
    })

    session.addEventListener('end', () => {
      this.hitTestSourceRequested = false
      this.hitTestSource = null
      this.referenceSpace = null

      this.camera.position.set(10, 10, 10)
      this.pivot.position.set(0, 0, 0)

      this.scene.background = new THREE.Color(0x000000)
      this.GalaxyStarParticles.visible = true

      this.reticle.visible = false
    })

    this.hitTestSourceRequested = true
  }

  //Target
  getHitTestResults(frame) {
    const hitTestResults = frame.getHitTestResults(this.hitTestSource)

    if (hitTestResults.length) {
      const referenceSpace = this.renderer.xr.getReferenceSpace()
      const hit = hitTestResults[0]
      const pose = hit.getPose(referenceSpace)

      this.reticle.visible = true
      this.reticle.matrix.fromArray(pose.transform.matrix)
    } else {
      /* Reset values */
      this.reticle.visible = false
    }
  }

  Render(timeStamp, frame) {
    const elapsedTime = this.Clock.getElapsedTime()

    // Change the center of the galaxy
    if (this.GalaxyParticlesMaterial) {
      this.GalaxyParticlesMaterial.uniforms.uTime.value = elapsedTime
      this.GalaxyParticlesMaterial.uniforms.uOriginX.value =
        this.pivot.position.x
      this.GalaxyParticlesMaterial.uniforms.uOriginY.value =
        this.pivot.position.y
      this.GalaxyParticlesMaterial.uniforms.uOriginZ.value =
        this.pivot.position.z
    }

    if (frame) {
      if (this.hitTestSourceRequested === false) {
        this.requestHitTestSource()
      }

      if (this.hitTestSource) {
        this.getHitTestResults(frame)
      }
    }

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  Resize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  CleanUpScene() {
    // this.gui.destroy()
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.dispose()
        child.geometry.dispose()
      }
    })
    try {
      document.getElementById('scene-container').removeChild(this.container)
    } catch (error) {}
  }
}

export { ARGalaxyExperience }
