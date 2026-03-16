// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || [];
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

//adds a new task to the todo array and updates the localStorage
function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

//renders all todo tasks on the page and updates the task counter
function displayTasks() {
  //clear the current list
  todoList.innerHTML = "";

  //loop through each todo item
  todo.forEach((item, index) => {
    //create container for the task
    const container = document.createElement("div");
    container.classList.add("todo-container");

    //create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = item.disabled;

    //creating task text
    const text = document.createElement("p");
    text.textContent = item.text;

    if (item.disabled) {
      text.classList.add("disabled");
    }

    //creating events
    checkbox.addEventListener("change", () => toggleTask(index));
    text.addEventListener("click", () => editTask(index));

    container.appendChild(checkbox);
    container.appendChild(text);
    todoList.appendChild(container);
  });

  //update task counter
  todoCount.textContent = todo.length;
}

//allows editing a task by replacing the text with an input field
function editTask(index) {
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () {
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

//toggles the completion state (checked/unchecked) of a task
function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled;
  saveToLocalStorage();
  displayTasks();
}

//removes all tasks from the todo list and clears localStorage
function deleteAllTasks() {
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

//saves the current todo array to localStorage
function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}
