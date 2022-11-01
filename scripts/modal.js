const card = document.querySelectorAll('.card')
const modal = document.querySelector('.modal')
const close = document.querySelector('.close')
card.forEach(
    item=>{
        item.addEventListener('click', toggleModal)
    }
)

function toggleModal(){
    modal.classList.toggle('ativo')

}

close.addEventListener('click', toggleModal)

function handleClose(event){
    if(!modal.classList.contains('inativo'))
    event.currentTarget !==modal && modal.classList.add('inativo')
}