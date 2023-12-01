const btn = document.getElementById('btn')
const section = document.getElementById('section')
const color = document.getElementById('colorcode')
let hexaValue = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F']

btn.addEventListener('click', () => {

    let hexColor = '#'
    for(let i=0; i<6; i++){
        hexColor += randonHaxValue()
    }
    color.innerHTML = hexColor
    section.style.backgroundColor = hexColor

})

function randonHaxValue(){
    let randIndex = Math.floor(Math.random()*16)
    return hexaValue[randIndex]
}