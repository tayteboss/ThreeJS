// setup renderer
const renderer = new THREE.WebGLRenderer({
    antialias: true,
})

// renderer options
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(0x000000, 1)

// element to set renderer too
const section = document.querySelector("section")
section.appendChild(renderer.domElement)

//create scene
const scene = new THREE.Scene()

//create camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 5000)
camera.position.z = -50
// camera.position.y = 50
camera.lookAt(scene.position)

//create lighting
const light = new THREE.DirectionalLight(0xffffff, 1)
light.position.set(0, 0, -1)
scene.add(light)

//hold data about shapes being added
const shapes = []

// add animation loop
function animate() {
    renderer.render(scene, camera)
    requestAnimationFrame(animate)

    //rotate shapes each frame
    shapes.forEach(shape => {
        shape.rotateX(0.01)
        shape.rotateY(0.005)
        shape.position.setZ(shape.position.z - 1)
    })
}

animate()



// lets hold a state of hue
let hue = 0

// create a shape 
function createShape(x, y) {

    const geometries = [
        new THREE.ConeGeometry(10, 20, 30),
        new THREE.BoxGeometry(15, 15, 15),
        new THREE.TorusGeometry(5, 3, 16, 100),
        new THREE.SphereGeometry(10, 32, 32),
    ]

    const randNum = Math.floor(Math.random() * geometries.length)
    const geometry = geometries[randNum]
    const emissiveColor = new THREE.Color("hsl(" + hue + ", 100%, 50%)")
    const material = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        emissive: emissiveColor,
        // wireframe: true
    })
    const shape = new THREE.Mesh(geometry, material)

    shape.position.set((window.innerWidth / 2) - x, (window.innerHeight / 2) - y, 600)
    // shape.rotateX(0.0005)
    // shape.rotateZ(0.0005)

    //add to scene and list of 'shapes' array
    shapes.push(shape)
    scene.add(shape)

    // update the hue 
    hue = hue + 1
}




// let's create on draw on MOB
let isMouseDown = false
document.addEventListener("touchmove", function(e) {
    if(isMouseDown) {
        createShape(e.pageX, e.pageY)
    }
})

document.addEventListener("touchstart", function() {
    isMouseDown = true
})

document.addEventListener("touchend", function() {
    isMouseDown = false
})

// let's create on draw on DESK
// let isMouseDown = false
// document.addEventListener("mousemove", function(e) {
//     if(isMouseDown) {
//         createShape(e.pageX, e.pageY)
//     }
// })

// document.addEventListener("mousedown", function() {
//     isMouseDown = true
// })

// document.addEventListener("mouseup", function() {
//     isMouseDown = false
// })