let formInput = document.getElementById("form-input");
const form = document.querySelector(".form");
const submit = document.getElementById("submit");
const alertWarn = document.getElementById("alert");
const todoList = document.getElementById("todoList");
const clearAll = document.getElementById("clear")

let editTodo = null;

const add = (e) => {
  e.preventDefault();
  console.log("hello");
  const inputText = formInput.value.trim();
  if (inputText.length <= 0) {
    alertWarn.innerHTML = "add some item";
    return false;
  }
  if (submit.value === "Edit") {
    const oldTodoText = editTodo.target.previousElementSibling.innerHTML;
    editLocalTodos(oldTodoText, formInput.value);
    editTodo.target.previousElementSibling.innerHTML = formInput.value;
    submit.value = "Add";
    formInput.value = "";
  } 
  else {
    const li = document.createElement("li");
    const p = document.createElement("p");
    p.innerHTML = inputText;
    li.appendChild(p);

    const editBtn = document.createElement("button");
    editBtn.innerHTML = `Edit`;
    editBtn.classList.add("btn", "blue");
    li.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `Remove`;
    deleteBtn.classList.add("btn", "red");
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
    formInput.value = "";
    saveLocalTodo(inputText);
  }
};

const updateValue = (e) => {
  if (e.target.innerHTML === `Remove`) {
    todoList.removeChild(e.target.parentElement);
    deleteLocalTodos(e.target.parentElement);
  }
  if (e.target.innerHTML === `Edit`) {
    formInput.value = e.target.previousElementSibling.innerHTML;
    formInput.focus();
    submit.value = `Edit`;
    editTodo = e;
  }
};


const saveLocalTodo = (todo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getLocalTodo = () => {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
    todos.forEach(todo=>{
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerHTML = todo;
      li.appendChild(p);

      const editBtn = document.createElement("button");
      editBtn.innerHTML = `Edit`;
      editBtn.classList.add("btn", "blue");
      li.appendChild(editBtn);

      const deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = `Remove`;
      deleteBtn.classList.add("btn", "red");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
    });
  }
};


const deleteLocalTodos = (todoElement) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoText = todoElement.children[0].innerHTML;
  todos = todos.filter(todo => todo !== todoText);
  localStorage.setItem("todos", JSON.stringify(todos));
};


const editLocalTodos = (oldTodo, newTodo) => {
  let todos = JSON.parse(localStorage.getItem("todos")) || [];
  let todoIndex = todos.indexOf(oldTodo);
  if (todoIndex !== -1) {
    todos[todoIndex] = newTodo;
    localStorage.setItem("todos", JSON.stringify(todos));
  }
};

const clearLocalTodos = () => {
  localStorage.clear();
  todoList.innerHTML = ""
}
clearAll.addEventListener("click",clearLocalTodos)
document.addEventListener("DOMContentLoaded", getLocalTodo);
form.addEventListener("submit", add);
todoList.addEventListener("click", updateValue);
