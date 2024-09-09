import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { ARButton } from './ARButton'

class ThreeExperience {
  container: HTMLElement

  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer

  controls: OrbitControls

  loader: GLTFLoader

  reticle: THREE.Mesh
  controller: null | THREE.XRTargetRaySpace = null
  hitTestSourceRequested: boolean = false
  hitTestSource: null | XRHitTestSource | undefined = null
  referenceSpace: any = null
  model: THREE.Group = new THREE.Group()

  constructor() {
    this.container = document.createElement('div')

    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    this.camera = new THREE.PerspectiveCamera(65, 100 / 100, 0.1, 100)
    this.camera.position.set(1, 1, 1)

    this.scene.add(this.camera)
    this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    this.renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    this.renderer.setAnimationLoop(this.render.bind(this))
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.container?.appendChild(this.renderer.domElement)

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.target.y = 0.5
    this.loader = new GLTFLoader()

    /* Model */
    this.scene.add(this.model)

    /* Lights */
    this.loadLights()

    /* Add reticle */
    this.reticle = new THREE.Mesh(
      new THREE.RingGeometry(0.15, 0.2, 32).rotateX(-Math.PI * 0.5),
      new THREE.MeshBasicMaterial()
    )
    this.reticle.visible = false
    this.scene.add(this.reticle)

    /* Controller */
    this.reticle.matrixAutoUpdate = false
    window.addEventListener('resize', this.resize.bind(this))
  }

  initScene(): void {
    document.getElementById('experience_scene_id')?.appendChild(this.container)
    this.resize()
    this.setupARExperience()
    this.addStarts()
  }

  setupARExperience(): void {
    this.renderer.xr.enabled = true

    new ARButton(this.renderer, {
      sessionInit: {
        requiredFeatures: ['hit-test'],
        optionalFeatures: ['dom-overlay'],
        domOverlay: { root: this.container },
      },
    })

    this.hitTestSourceRequested = false //target
    this.hitTestSource = null //origin

    const onSelect = () => {
      if (this.reticle.visible) {
        this.model.visible = true
        this.model.position.setFromMatrixPosition(this.reticle.matrix)
        this.model.quaternion.setFromRotationMatrix(this.reticle.matrix)
      }
    }

    // this controller
    this.controller = this.renderer.xr.getController(0)
    this.scene.add(this.controller)
    this.controller.addEventListener('select', () => {
      onSelect()
    })

    this.removeSceneBackground()
  }

  //Origin
  requestHitTestSource() {
    const session = this.renderer.xr.getSession()
   

    if (session) {
      session.requestReferenceSpace('viewer').then((referenceSpace) => {
        if(session.requestHitTestSource!)
        {
          session.requestHitTestSource({ space: referenceSpace })!.then((source: XRHitTestSource | undefined) => {
            this.hitTestSource = source
          }).catch(err => console.log(err))
        }
      })


        
      session.addEventListener('end', () => {
        this.hitTestSourceRequested = false
        this.hitTestSource = null
        this.referenceSpace = null
        this.model.position.set(0, 0, 0)
        this.camera.position.set(1, 1, 1)
        this.reticle.visible = false
        this.scene.background = null
        window.location.reload()
      })
    }

    this.hitTestSourceRequested = true
  }

  /* remove scene background */
  removeSceneBackground() {
    document.getElementById('ar_button_id')?.addEventListener('click', () => {
      this.scene.background = null
      this.model.visible = false
    })
  }

  //Target
  getHitTestResults(frame: any) {
    const hitTestResults = frame.getHitTestResults(this.hitTestSource)

    if (hitTestResults.length) {
      const referenceSpace = this.renderer.xr.getReferenceSpace()
      const hit = hitTestResults[0]
      const pose = hit.getPose(referenceSpace)

      this.reticle.visible = true
      this.reticle.matrix.fromArray(pose.transform.matrix)
    } else {
      this.reticle.visible = false
    }
  }

  addStarts() {
    const particles = new THREE.BufferGeometry()
    const particlesCount = 500

    const posArray = new Float32Array(particlesCount * 3)
    //xyz xyz xyz xyz

    for (let i = 0; i < particlesCount; i++) {
      posArray[i] = (Math.random() - 0.5) * 1.5
      posArray[i + 1] = Math.random() + 0.5 * 1.5
      posArray[i + 2] = (Math.random() - 0.5) * 1.5
    }

    particles.setAttribute('position', new THREE.BufferAttribute(posArray, 3))

    const material = new THREE.PointsMaterial({
      size: 0.005,
      color: 0xffffff,
    })
    const particleMesh = new THREE.Points(particles, material)
    this.model.add(particleMesh)
  }

  /* Renmove AR Button */
  removeARButton() {
    const arButton = document.getElementById('ar_button_id')
    if (arButton) {
      document.body.removeChild(arButton)
    }
  }

  resize(): void {
    this.renderer.setSize(window.innerWidth, window.innerHeight)
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
  }

  loadModel(name: string): void {
    this.loader.load(`/models/${name}.glb`, (gltf) => {
      this.model.add(gltf.scene)
    })
  }

  render(timestamp: number, frame: any): void {
    if (frame) {
      if (this.hitTestSourceRequested === false) {
        this.requestHitTestSource()
      }

      if (this.hitTestSource) {
        this.getHitTestResults(frame)
      }
    }

    for (let child of this.model.children) {
      if (child instanceof THREE.Group) {
        child.rotation.y += 0.004
      }
    }

    this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }

  loadLights(): void {
    const dir = new THREE.DirectionalLight(0xffffff, 1.5)
    dir.position.set(10, 10, 10)
    this.scene.add(dir)

    const ambienLigt = new THREE.AmbientLight(0xffffff, 0.5)
    this.scene.add(ambienLigt)

    const env = new THREE.CubeTextureLoader().load([
      '/env/px.png',
      '/env/nx.png',
      '/env/py.png',
      '/env/ny.png',
      '/env/pz.png',
      '/env/nz.png',
    ])
    this.scene.environment = env
  }

  disposeScene(): void {
    console.log('dispose')
    this.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material.dispose()
        child.geometry.dispose()
      }
    })

    document.getElementById('experience_scene_id')?.removeChild(this.container)
  }
}

export { ThreeExperience }
