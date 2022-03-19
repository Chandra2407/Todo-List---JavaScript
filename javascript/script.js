//Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");
const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
const elements = document.getElementsByClassName('alert');

//Event Listeners
document.addEventListener("DOMContentLoaded", getTodo);
todoButton.addEventListener("click", addTodo);
todoInput.addEventListener("keypress", checkEnterClick);
todoList.addEventListener("click", deleteCheck);
todoList.addEventListener("click", completeCheck);


//Functions
function addTodo() {
    //create todo div
    if (todoInput.value != "") {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todoInput.value;
        newTodo.classList.add("new-todo");
        todoDiv.appendChild(newTodo);

        //add todo to localstorage
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];	
        } else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        todos.push(todoInput.value);
        localStorage.setItem("todos", JSON.stringify(todos));
        // create icons
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);


        //append list
        todoList.appendChild(todoDiv);
        todoInput.value = "";
        if (elements.length === 1)
            elements[0].remove();
    } else {
        alert('Enter Something bruh!', 'warning');
    }

}

//check if entre key is pressed
function checkEnterClick(e) {
    if (e.keyCode == 13) {
        addTodo();
    }
}

function deleteCheck(e) {
    const item = e.target;

    if (item.classList[0] === "delete-btn") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeTodo(todo);
        todo.addEventListener("transitionend", function () {
            todo.remove(); // waits for the fall transition to be finished then removes
        })
    }
}

function completeCheck(e) {
    const item = e.target;
    if (item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function alert(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + ' </div>'
    if (elements.length === 0)
        alertPlaceholder.append(wrapper);
}

function getTodo() {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        // create li
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("new-todo");
        todoDiv.appendChild(newTodo);

        // create icons
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>';
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);

        const deleteButton = document.createElement('button');
        deleteButton.innerHTML = '<i class="fas fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);


        //append list
        todoList.appendChild(todoDiv);
    })
}

function removeTodo(todo) {
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index), 1);
    localStorage.setItem('todos', JSON.stringify(todos));

}