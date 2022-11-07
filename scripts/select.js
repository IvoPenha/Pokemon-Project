const select = document.querySelector('.select-input-type')
const optionsList = document.querySelector('.select-type-options')
const options = document.querySelectorAll('.select-type-options li')


optionsList.addEventListener('click', 
    ()=>{
        if(! optionsList.classList.contains('ativo'))
          optionsList.classList.add('ativo')
    }
)


options.forEach(
    (item) => {
        item.addEventListener('click', (item)=> handleInitial(item))
    }
)

function handleInitial(props){
    options.forEach(
        item => item.classList.remove('init')  
    )
    props.classList.add('init')
    if(optionsList.classList.contains('ativo'))

    
}
