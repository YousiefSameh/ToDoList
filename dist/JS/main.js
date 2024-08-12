const form = document.querySelector("form");
const submitBtn = document.querySelector("button");
const taskInput = document.querySelector("input");
const list = document.querySelector(".list");
let currentTask = 1;

submitBtn.addEventListener("click", generateLists);

function generateLists(event) {
  event.preventDefault();
  if (taskInput.value !== "") {
    let newTask = document.createElement("li");
    let titleTask = document.createElement("p");
    let optionsDiv = document.createElement("div");
    let delBtn = document.createElement("a");
    let checkBtn = document.createElement("a");
    let editBtn = document.createElement("a");
    delBtn.setAttribute("class", "del");
    checkBtn.setAttribute("class", "checkBtn");
    editBtn.setAttribute("class", "editBtn");
    titleTask.innerHTML = `<span>${currentTask}.</span> ${taskInput.value}`;
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    list.appendChild(newTask);
    newTask.appendChild(titleTask);
    newTask.appendChild(optionsDiv);
    optionsDiv.appendChild(editBtn);
    optionsDiv.appendChild(delBtn);
    optionsDiv.appendChild(checkBtn);
    delBtn.addEventListener("click", deleteTask);
    checkBtn.addEventListener("click", checkTask);
    editBtn.addEventListener("click", editTask);
    newTask.dataset.taskNumber = currentTask;
    taskInput.value = "";
    currentTask++;
  }
}

function deleteTask(event) {
  const task = event.target.parentNode.parentNode.parentNode; 
  task.remove();
}

function checkTask(event) {
  const task = event.target.parentNode.parentNode.parentNode; 
  task.classList.toggle("check"); 
}

function editTask(event) {
  event.preventDefault();
  const task = event.target.parentNode.parentNode.parentNode;
  let title = task.children[0];
  const editText = prompt("Enter The Edit Text Task: ");
  if (editText !== null) {
    title.innerHTML = `<span>${task.dataset.taskNumber}.</span> ${editText}`;
  }
}