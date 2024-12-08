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
document.addEventListener('DOMContentLoaded', getTodo);
function modalActions(){
    modal.classList.toggle('active');                   // function of open and close modal with click
    overlay.classList.toggle('active')  
}
function submitModal(ev){
    if(todoInput.value !== ''){
        createNewStatus(todoInput.value ,true , `todo-${todoCounter}`)
        modalActions()
        todoInput.value = ''
    }
}


// document.querySelectorAll('.todo').forEach((todo) => {
//     const uniqueId = `todo-${todoCounter}`;
//     todo.setAttribute('id', uniqueId);
//     todoCounter++; 
// });


function createNewStatus(todoText , isSave ,id = `todo-${todoCounter}`){
    const newTodoCreate = document.createElement('div')
    newTodoCreate.setAttribute('draggable' , 'true')
    newTodoCreate.classList.add('todo')
    if(isSave) localStorageSave(id, todoText)    //! localStorage Save
    todoCounter++
    newTodoCreate.setAttribute('id', id);
    newTodoCreate.innerHTML = `
    ${todoText}
    <span class="close">&times;</span>
    `;
    noStatusArea.appendChild(newTodoCreate)
    newTodoCreate.querySelector('.close').addEventListener('click', (event) => {
        closeTodoActive(event, id);
    });
}
function closeTodoActive(event , id){
    if(event.target.classList.contains('close')){
        let parentElm = event.target.parentNode
        parentElm.remove()
        const todoList = JSON.parse(localStorage.getItem('todo'));
        const updatedList = todoList.filter(todo => todo.id != id);
        localStorage.setItem('todo', JSON.stringify(updatedList));
    }
}
/////////////////////////////////////////////////////////////
function drapHandeler(ev) { 
    ev.dataTransfer.setData('elemDataID', ev.target.getAttribute('id'))
}
function dropHandeler(ev){
    ev.preventDefault()
    const elmDataId = ev.dataTransfer.getData('elemDataID')
    let targetElm = document.getElementById(elmDataId)
    document.getElementById(ev.toElement.id).appendChild(targetElm)
    updateTodoLocation(elmDataId, ev.toElement.id);
}

function updateTodoLocation(id, containerId) {
    const todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    const todoIndex = todoList.findIndex((todo) => todo.id === id);
    if (todoIndex !== -1) {
        todoList[todoIndex].container = containerId;
        localStorage.setItem('todo', JSON.stringify(todoList));
    }
}

function localStorageSave(id ,text) {
    const todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    const todoItemLocal = {
        id,
        text
    };
    todoList.push(todoItemLocal)
    localStorage.setItem('todo' , JSON.stringify(todoList))
    console.log(todoList);
}
function getTodo(toElement) {
    const todoList = localStorage.getItem('todo') ? JSON.parse(localStorage.getItem('todo')) : [];
    todoList.forEach(todo => {
        createNewStatus(todo.text ,false , todo.id)
        const container = document.getElementById(todo.container || 'no_status');
        const todoElm = document.getElementById(todo.id);
        if (container) container.appendChild(todoElm);
    });
}










