const newTask       = document.querySelector("#new-task")
const btnAddTask    = document.querySelector("#add-task")
const todoList      = document.querySelector(".todo-list ul")

// Funções
const checkDone = function (event) {
    const task = event.target.parentNode
    const taskText = task.innerText

    todoList.removeChild(task)
}

// Eventos
btnAddTask.onclick = function() {
    const taskExample = document.querySelector("#task-example")
    if(taskExample !== null) {
        todoList.removeChild(taskExample)
    }
    const li    = document.createElement("li")
    const check = document.createElement("input") 
    const label = document.createElement("label")
    label.innerText = newTask.value
    check.setAttribute("type", "checkbox")
    li.appendChild(check)
    li.appendChild(label)
    todoList.appendChild(li)

    newTask.value = ""
    newTask.focus()

    check.addEventListener("change", checkDone)

}

newTask.onkeyup = function(event) {
    if(event.keyCode === 13) {
        btnAddTask.click()
    }
}
