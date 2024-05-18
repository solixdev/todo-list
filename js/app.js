const input = document.getElementById('itemInput')
const addButton = document.getElementById('addButton')
const clearButton = document.getElementById('clearButton')
const todoContainer = document.getElementById('todoList')

let todoArray = []

function loadData() {
    let data = localStorage.getItem('todoData')

    if (data) {
        let fetchData = JSON.parse(data)
        todoArray = fetchData
        console.log(fetchData);
    } else {
        todoArray = []
        console.log('there is nothing here ve');
    }
}


// Insert todo's into DOM and browser local storage 
function insertTodo() {

    let todoValue = input.value

    // Create a todo object to insert into array
    let newTodoObject = {
        id: todoArray.length + 1,
        value: todoValue,
        status: false
    }


    // Add created object into todo's array
    todoArray.push(newTodoObject)
    // Add todo's array into local storage
    addToLocalStorage(todoArray)


    // Clear data from input
    input.value = ''
    // To focus mouse cursor on input
    input.focus()

}



// Add todo's array to local storage function
function addToLocalStorage(todoItem) {
    localStorage.setItem('todoData', JSON.stringify(todoItem))
}


function clearAllTodo() {
    localStorage.removeItem('todoData')
}




window.addEventListener('load', loadData)
addButton.addEventListener('click', insertTodo)
clearButton.addEventListener('click', clearAllTodo)