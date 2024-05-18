const input = document.getElementById('itemInput')
const addButton = document.getElementById('addButton')
const clearButton = document.getElementById('clearButton')
const todoContainer = document.getElementById('todoList')

let todoArray = []

// ---------- Load data when app is running from local storage
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


// ---------- Insert todo's into DOM and browser local storage 
function insertTodo() {

    // Define a variable for insert input value in it and delete any fake and whitespace from it
    let todoValue = input.value.trim()


    if (todoValue) {

        // Create a todo object to insert into array
        let newTodoObject = {
            id: todoArray.length + 1,
            value: todoValue.trim(),
            status: false
        }


        // Add created object into todo's array
        todoArray.push(newTodoObject)

        // Add todo's array into local storage
        addToLocalStorage(todoArray)

        // Add todo list into DOM
        addToDOM(todoArray)

    } else {
        alert('Should insert a valid value to create your todo list')
    }


    // Clear data from input
    input.value = ''
    // To focus mouse cursor on input
    input.focus()

}


// ---------- Add todo's into DOM function
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

        // Create complete/unComplete button for todo
        newTodoCompleteBtn = document.createElement('button')
        newTodoCompleteBtn.classList = 'btn btn-success'
        newTodoCompleteBtn.innerHTML = 'Complete'
        // Set edit function to change todo's status
        newTodoCompleteBtn.setAttribute('onclick', 'editTodoElement(' + todo.id + ')')
        // To check todo's status and change button title to complete or unComplete
        if (todo.status) {
            newTodoLi.className = 'uncompleted well'
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


// ---------- Add todo's array to local storage function
function addToLocalStorage(todoItem) {
    localStorage.setItem('todoData', JSON.stringify(todoItem))
}



// ---------- Edit todo's status function
function editTodoElement(todoId) {

    // Load and insert data from local storage in variable
    let loadedData = JSON.parse(localStorage.getItem('todoData'))

    // Set fetched data into todoArray
    todoArray = loadedData

    todoArray.forEach(item => {
        // If that todo which clicked on it that's status is false, it changes status to true and vice versa
        if (todoId === item.id) {
            item.status = !item.status
        }
    })

    // Refresh todo status in local storage
    addToLocalStorage(todoArray)
    addToDOM(todoArray)
}



// ---------- Clear all data form local storage and Dom
function clearAllTodo() {
    localStorage.removeItem('todoData')
    todoArray = []
    addToDOM(todoArray)
    loadData()
}


window.addEventListener('load', loadData)
addButton.addEventListener('click', insertTodo)
clearButton.addEventListener('click', clearAllTodo)