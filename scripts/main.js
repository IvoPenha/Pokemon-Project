import createModal from "./modal.js"
import  toHandleCase  from "./toHandleCase.js";
let card = document.querySelectorAll('.card')
let apiIndex = 0
const pokemonTotalNumber = document.querySelector('.pokeball-icon h4')
function pullPokemonsData(pokeurl){
    axios({
        baseURL: pokeurl
    })
    .then(r=> r.data.results)
    .then( pokedata => {
        
        pokedata.forEach(
            pokemons =>{
                axios({
                    baseURL: pokemons.url
                }).then(r=> r.data)
                .then(pokemon => {
                    const { name, types, id, sprites,} = pokemon
                    
                    createPokemonCard(name, types[0].type.name, id, sprites.other.dream_world.front_default )
                }
                )
            }
        )
    })
    // sprites.versions["generation-v"]["black-white"].animated.front_default
    apiIndex+=12
}

const PokemonCardList = document.querySelector('.card-list')

function createPokemonCard(name, type, id, sprite){
    const pokemonSingleCard = document.createElement('div')
    pokemonSingleCard.className = 'card'
    PokemonCardList.appendChild(pokemonSingleCard)

    const pokemonImageMask = document.createElement('div')
    pokemonImageMask.className = 'img-mask'
    pokemonSingleCard.appendChild(pokemonImageMask)
    
    const pokemonBackground = document.createElement('div')
    pokemonImageMask.appendChild(pokemonBackground)
    pokemonBackground.className = 'img-background'
    pokemonBackground.classList.add(type)

    const pokemonImage = document.createElement('img')
    pokemonBackground.appendChild(pokemonImage)
    pokemonImage.src = sprite

    const pokemonCardFooter = document.createElement('div')
    pokemonSingleCard.appendChild(pokemonCardFooter)
    pokemonCardFooter.className = 'card-footer'

    const pokemonInfo = document.createElement('div')
    pokemonCardFooter.appendChild(pokemonInfo)
    pokemonInfo.className = 'info'

    const pokemonIdHash = document.createElement('span')
    pokemonInfo.appendChild(pokemonIdHash)
    pokemonIdHash.className ='number'
    pokemonIdHash.innerText = id < 10 ? '#00' + id : id<100 ? '#0' +id : '#'+id

    const pokemonName = document.createElement('h3')
    pokemonInfo.appendChild(pokemonName)
    pokemonName.className='pokemon-name'
    pokemonName.innerText = toHandleCase(name)
    
    const pokemonTypeIcon = document.createElement('img')
    pokemonCardFooter.appendChild(pokemonTypeIcon)
    pokemonTypeIcon.src= 'assets/icon-types/'+type+'.svg'
    cardListener()
}

function cardListener(){
    card = document.querySelectorAll('.card')
    card.forEach(
        (item, index)=>{
            item.addEventListener('click',  toggleModal)
        }
    )
}

const modal = document.querySelector('.modal')
let modalBox = document.querySelector('.box')
function toggleModal(event){
    modalBox = document.querySelector('.box')
    if(modalBox){
         modal.removeChild(modalBox)
    }
    pullDetailedPokemonDatas(
        "https://pokeapi.co/api/v2/pokemon/"+
        +event.currentTarget.children[1].children[0].children[0].innerText.slice(1)
        )
    modal.classList.add('ativo')
    
       
}

function pullPokemonNumbers(){
    axios({
        baseURL:'https://pokeapi.co/api/v2/pokemon?limit=12&offset=0',
    })
    .then(r=>r.data).then(j=> pokemonTotalNumber.innerText = j.count + ' pokemons')
    
}
pullPokemonNumbers()


function pullDetailedPokemonDatas(pokeurl){
    axios({
        baseURL: pokeurl
    })
    .then(r=> r.data)
    .then( pokemon => {
                    const { name, types, id, sprites, ability, weight, height, stats, abilities } = pokemon

                    createModal(name,id, sprites.other.dream_world.front_default, types, abilities, height, weight, stats)
                    // createModal(name, types, id, sprites.other.dream_world.front_default, weight,height,abilities,stats)
                    // name, types, id, sprites.other.dream_world.front_default, 
                }
                )
                 
}







pullPokemonsData('https://pokeapi.co/api/v2/pokemon?limit=12&offset=0')

const loadMorePokemonBtn = document.querySelector('.loadMore')

loadMorePokemonBtn.addEventListener('click', ()=> pullPokemonsData('https://pokeapi.co/api/v2/pokemon?offset='+apiIndex+'&limit=12'))