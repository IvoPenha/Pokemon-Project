import pullPokemonByType from "./filter.js"
const select = document.querySelector('.select-input-type')
const optionsList = document.querySelector('.select-type-options')
const options = document.querySelectorAll('.select-type-options li')
const selectDropdownBtn = document.querySelector('.select-button')
const typeSelected = document.querySelector('.type-selected')
let activeOption = document.querySelector('.active-option-item')

handleSelectedType()

selectDropdownBtn.addEventListener('click', toogleSelectDropdown)

options.forEach(
    option=> option.addEventListener('click', ()=>{
        handleSelectedTypeSelectDropdown(option)
        pullPokemonByType(option.dataset.value)
    })
)

function toogleSelectDropdown(){
    optionsList.classList.toggle('active')
}

function removeActiveOptionsClass(){
    options.forEach(
        option=> option.classList.remove('active-option-item')
    )
}
function handleSelectedTypeSelectDropdown(e){
    removeActiveOptionsClass()
    e.classList.add('active-option-item')
    handleSelectedType()
    toogleSelectDropdown()
}
function handleSelectedType(){
    activeOption = document.querySelector('.active-option-item')
    typeSelected.innerHTML = activeOption.innerHTML
}
