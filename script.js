const container = document.querySelector('.items')
const cubes = document.querySelectorAll('.item')

let selectedCube = null
let offsetX = 0
let offsetY = 0

cubes.forEach(cube => {
  cube.style.position = 'absolute' // allow free movement
  cube.addEventListener('mousedown', e => {
    selectedCube = cube
    const rect = cube.getBoundingClientRect()
    offsetX = e.clientX - rect.left
    offsetY = e.clientY - rect.top
    cube.style.zIndex = 1000 // bring to front while dragging
    document.addEventListener('mousemove', moveCube)
    document.addEventListener('mouseup', dropCube)
  })
})

function moveCube(e) {
  if (!selectedCube) return

  const containerRect = container.getBoundingClientRect()
  const cubeRect = selectedCube.getBoundingClientRect()

  let x = e.clientX - containerRect.left - offsetX
  let y = e.clientY - containerRect.top - offsetY


  if (x < 0) x = 0
  if (y < 0) y = 0
  if (x + cubeRect.width > containerRect.width) {
    x = containerRect.width - cubeRect.width
  }
  if (y + cubeRect.height > containerRect.height) {
    y = containerRect.height - cubeRect.height
  }

  selectedCube.style.left = x + 'px'
  selectedCube.style.top = y + 'px'
}

function dropCube() {
  if (selectedCube) {
    selectedCube.style.zIndex = 1
    selectedCube = null
  }
  document.removeEventListener('mousemove', moveCube)
  document.removeEventListener('mouseup', dropCube)
}
