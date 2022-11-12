import {  createPokemonCard } from "./main.js"
import resetCardList from "./resetState.js"
import scrollToListStart from "./windowScroller.js"
const searchedPokemon = document.querySelector('.search input')
const inputEnter = document.querySelector('.search .img-mask')
const loadMore = document.querySelector('.loadMore')
const pokemonTotalNumber = document.querySelector('.pokeball-icon h4')

inputEnter.addEventListener('click', pullEspecificPokemon)

function pullEspecificPokemon(){
    resetCardList()
    pokemonTotalNumber.innerHTML = '0 pokemons'

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
    scrollToListStart()
    
    loadMore.classList.add('inativo')
}