const input = document.getElementById('itemInput')
const addButton = document.getElementById('addButton')
const clearButton = document.getElementById('clearButton')
const todoContainer = document.getElementById('todoList')

let todoArray = []

// Load data when app is running from local storage
function loadData() {
    let data = localStorage.getItem('todoData')

    if (data) {
        // Fetching data from local storage when app is run and insert into todo's array
        let fetchData = JSON.parse(data)
        todoArray = fetchData

        // Put fetched data into DOM as elements
        addToDOM(todoArray)

    } else {
        todoArray = []
        console.log('There is nothing here ...');
    }
}


// Insert todo's into DOM and browser local storage 
function insertTodo() {

    let todoValue = input.value

    // Create a todo object to insert into array
    let newTodoObject = {
        id: todoArray.length + 1,
        value: todoValue,
        status: true
    }


    // Add created object into todo's array
    todoArray.push(newTodoObject)

    // Add todo's array into local storage
    addToLocalStorage(todoArray)

    // Add todo list into DOM
    addToDOM(todoArray)


    // Clear data from input
    input.value = ''
    // To focus mouse cursor on input
    input.focus()

}


function addToDOM(todoArray) {

    let newTodoLi, newTodoTitle, newTodoCompleteBtn, newTodoDeleteBtn

    todoContainer.innerHTML = ''

    todoArray.forEach(todo => {

        // Create a new li element to DOM
        newTodoLi = document.createElement('li')
        newTodoLi.className = 'completed well'

        // Create new label element for todo's title
        newTodoTitle = document.createElement('label')
        newTodoTitle.innerHTML = todo.value

        // Create complete/uncomplete button for todo
        newTodoCompleteBtn = document.createElement('button')
        newTodoCompleteBtn.classList = 'btn btn-success'
        // Check complete button status which it's true or false to define this button value
        if (todo.status === false) {
            newTodoCompleteBtn.innerHTML = 'Complete'
        } else {
            newTodoCompleteBtn.innerHTML = 'UnComplete'

        }

        // Create delete button for todo
        newTodoDeleteBtn = document.createElement('button')
        newTodoDeleteBtn.classList = 'btn btn-danger'
        newTodoDeleteBtn.innerHTML = 'Delete'

        // Append created elements into li element
        newTodoLi.append(newTodoTitle, newTodoCompleteBtn, newTodoDeleteBtn)
        // Append li element ino ul which is a container for all todos
        todoContainer.append(newTodoLi)


    })
}


// Add todo's array to local storage function
function addToLocalStorage(todoItem) {
    localStorage.setItem('todoData', JSON.stringify(todoItem))
}


// Clear all data form local storage and Dom
function clearAllTodo() {
    localStorage.removeItem('todoData')
    todoArray = []
    addToDOM(todoArray)
    loadData()
}




window.addEventListener('load', loadData)
addButton.addEventListener('click', insertTodo)
clearButton.addEventListener('click', clearAllTodo)