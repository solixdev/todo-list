const input = document.getElementById('itemInput')
const addButton = document.getElementById('addButton')
const clearButton = document.getElementById('clearButton')
const todoContainer = document.getElementById('todoList')

let todoArray = []

// Insert todo's into DOM and browser local storage 
function insertTodo() {

    // Create a todo object to insert into array
    let newTodoObject = {
        id: todoArray.length + 1,
        name: 'Todo',
        value: input.value,
        status: false
    }

    // Clear data from input
    input.value = ''
    // To focus mouse cursor on input
    input.focus()


    // Add created object into todo's array
    todoArray.push(newTodoObject)


}





addButton.addEventListener('click', insertTodo)