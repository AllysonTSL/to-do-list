const newTask = document.querySelector("#new-task");
const btnAddTask = document.querySelector("#add-task");
const todoList = document.querySelector("#ul1");
const doneList = document.querySelector(".complete-list ul");

// Funções
const checkDone = function (event) {
  const task = event.target.parentNode;
  const taskText = task.querySelector("span").innerText;

  todoList.removeChild(task);

  const taskDoneExample = doneList.querySelector("#task-done-example");
  if (taskDoneExample !== null) {
    doneList.removeChild(taskDoneExample);
  }

  const undo = addListItem(doneList, taskText, true);

  undo.addEventListener("change", function (ev) {
    const taskUndo = undo.parentNode;
    const taskUndoText = taskUndo.querySelector("span").innerText;

    doneList.removeChild(taskUndo);

    const cb = addListItem(todoList, taskUndoText);
    cb.addEventListener("change", checkDone);

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Apagar";
    deleteButton.classList.add("delete");
    taskUndo.appendChild(deleteButton);

    deleteButton.addEventListener("click", function (ev) {
      doneList.removeChild(taskUndo);
    });
  });
};

const addListItem = function (list, value, checked = false) {
  const li = document.createElement("li");
  const check = document.createElement("input");
  const label = document.createElement("label");
  const deleteButton = document.createElement("button");
  check.setAttribute("type", "checkbox");
  li.appendChild(check);
  label.innerHTML = `<span>${value}</span>`;
  li.appendChild(label);
  deleteButton.innerText = "Apagar";
  deleteButton.classList.add("delete");
  li.appendChild(deleteButton);
  list.appendChild(li);

  if (checked) {
    check.setAttribute("checked", "checked");
    label.querySelector("span").classList.add("done");
  }

  deleteButton.addEventListener("click", function (ev) {
    const taskToRemove = deleteButton.parentNode;
    list.removeChild(taskToRemove);
  });

  return check;
};


// Eventos
btnAddTask.onclick = function () {
  const taskExample = document.querySelector("#task-example");
  if (taskExample !== null) {
    todoList.removeChild(taskExample);
  }

  const check = addListItem(todoList, newTask.value);

  newTask.value = "";
  newTask.focus();

  check.addEventListener("change", checkDone);
};

newTask.onkeyup = function (event) {
  if (event.keyCode === 13) {
    btnAddTask.click();
  }
};
