const modal = document.querySelector('.modal')
const addBtn = document.querySelector('#add_btn')
const overlay = document.querySelector('#overlay')
const closeModal = document.querySelector('.close-modal')
const submitNewTodo = document.querySelector('#todo_submit') 
const todoInput = document.querySelector('#todo_input')
const noStatusArea = document.querySelector('#no_status')
const StatusArea = document.querySelectorAll('.status')
let todoCounter = 0
//* events
addBtn.addEventListener('click', modalActions)
closeModal.addEventListener('click', modalActions)    // event of open and close modal with click
overlay.addEventListener('click', modalActions)
//! ...............................................
submitNewTodo.addEventListener('click', submitModal)
StatusArea.forEach((area)=>{
    area.addEventListener('dragstart', drapHandeler)
    area.addEventListener('dragover', (event)=> event.preventDefault())
    area.addEventListener('drop', dropHandeler)
    area.addEventListener('click', closeTodoActive)
})

function modalActions(){
    modal.classList.toggle('active');                   // function of open and close modal with click
    overlay.classList.toggle('active')  
}
function submitModal(){
    if(todoInput.value !== ''){
        createNewStatus()
        modalActions()
        todoInput.value = ''
    }
}
function createNewStatus(){
    let todoText = todoInput.value
    const newTodoCreate = document.createElement('div')
    newTodoCreate.setAttribute('draggable' , 'true')
    newTodoCreate.classList.add('todo')
    const uniqueId = `todo-${todoCounter}`;
    todoCounter++
    newTodoCreate.setAttribute('id', uniqueId);
    newTodoCreate.innerHTML = `
    ${todoText}
    <span class="close">&times;</span>
    `;
    noStatusArea.appendChild(newTodoCreate)
}
function closeTodoActive(event){
    if(event.target.classList.contains('close')){
        let parentElm = event.target.parentNode
        parentElm.remove()
    }
}
/////////////////////////////////////////////////////////////
document.querySelectorAll('.todo').forEach((todo) => {
    const uniqueId = `todo-${todoCounter}`;
    todo.setAttribute('id', uniqueId);
    todoCounter++; 
});
function drapHandeler(ev) { 
    ev.dataTransfer.setData('elemDataID', ev.target.getAttribute('id'))
}
function dropHandeler(ev){
    ev.preventDefault()
    const elmDataId = ev.dataTransfer.getData('elemDataID')
    let targetElm = document.getElementById(elmDataId)
    document.getElementById(ev.toElement.id).appendChild(targetElm)
}





