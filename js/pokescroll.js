const pokemenu = document.getElementById('pokemenu')

let dragging = false

pokemenu.addEventListener('mousemove', (drag) => {
    if(!dragging) return;
    pokemenu.scrollLeft -= drag.movementX
})

document.addEventListener('mouseup', () => {
    dragging = false
})

pokemenu.addEventListener('mousedown', () => {
    dragging = true
})
