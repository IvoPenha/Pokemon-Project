import { pullPokemonCaseAll, removeAtivoFromList } from "./filter.js"
import {  createPokemonCard } from "./main.js"
import resetCardList from "./resetState.js"
import scrollToListStart from "./windowScroller.js"
const searchedPokemon = document.querySelector('.search input')
const inputEnter = document.querySelectorAll('.search .img-mask')
const loadMore = document.querySelector('.loadMore')
const pokemonTotalNumber = document.querySelector('.pokeball-icon h4')
const cardList = document.querySelector('.card-list')
const ElementAllFromList = document.querySelector('.type-list li.all')
const select = document.querySelector('.select-input-type')

inputEnter.forEach(item=> item.addEventListener('click', pullEspecificPokemon))

function pullEspecificPokemon(){
    
    select.style.outline= '1px solid var(--type-all)'
    resetCardList()
    removeAtivoFromList()
    pokemonTotalNumber.innerHTML = '0 pokemons'
    scrollToListStart()
    
    if(searchedPokemon.value===''){
        handleZeroPokemon()
        }


    else {
        
        axios({
            baseURL: 'https://pokeapi.co/api/v2/pokemon/'+ searchedPokemon.value.toLowerCase()
        }).then(r=> r.data)
        .then(pokemon => {
            let { name, types, id, sprites,} = pokemon
            let spriteSelected = (sprites.other.dream_world.front_default !== null) ? sprites.other.dream_world.front_default : sprites.front_default
            createPokemonCard(name, types[0].type.name, id, spriteSelected )
            pokemonTotalNumber.innerHTML = '01 pokemon'
        }
        )
        
        loadMore.classList.add('inativo')
        return 1
    }
}


function handleZeroPokemon(){
    
    cardList.innerHTML= '<button> <h5> You apeared to searched for none pokemon Click for get back to the start </h5>' +ElementAllFromList.innerHTML + '</button>'
    cardList.firstChild.style.backgroundColor='#242420'
    cardList.firstChild.style.marginTop = '20px'
    cardList.firstChild.style.cursor = 'pointer'
    cardList.firstChild.addEventListener('click',()=>{
        pullPokemonCaseAll()
        resetCardList()

    })

}