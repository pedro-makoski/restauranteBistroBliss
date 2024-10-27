document.addEventListener('click', () => {
    openIdentify('.hamburguer')
    closeIdentify('.exit')
})

window.addEventListener('resize', () => {
    openIdentify('.hamburguer')
})