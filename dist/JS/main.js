let input = document.querySelector("#input");
let submit = document.querySelector("#add");
let tasksContainer = document.querySelector("#list");

let arrayOfTasks = [];
let currentTask = 1;

if (localStorage.getItem("tasks")) {
  arrayOfTasks = JSON.parse(localStorage.getItem("tasks"));
} else {
  arrayOfTasks = [];
}

getDataFromLocalStorage();

submit.onclick = () => {
  if (input.value !== "") {
    addTaskToArray(input.value, currentTask); // Add Task To Array Of Tasks
    currentTask++;
    input.value = ""; // Empty The Input Field
  }
}

tasksContainer.addEventListener("click", (e) => {
  // Delete Button
  if (e.target.classList.contains("delBtn")) {
    // Remove Task From Local Storage
    deleteTaskWith(e.target.parentNode.parentNode.getAttribute("data-id"));
    // Remove Element From Page
    e.target.parentNode.parentNode.remove();
  }
  if (e.target.classList.contains("checkBtn")) {
    toggleStatusTaskWith(e.target.parentNode.parentNode.getAttribute("data-id"));
    e.target.parentNode.parentNode.classList.toggle("check");
  }
  if (e.target.classList.contains("editBtn")) {
    editTaskWith(e.target.parentNode.parentNode.getAttribute("data-id"));
  }
})

function addTaskToArray(taskText, currentTask) {
  const Task = {
    number: currentTask,
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  arrayOfTasks.push(Task);
  addElementsToPageFrom(arrayOfTasks);
  addTasksToLocalStorageFrom(arrayOfTasks);
}

function addElementsToPageFrom(arrayOfTasks) {
  tasksContainer.innerHTML = "";
  arrayOfTasks.forEach((task) => {
    let taskList = document.createElement("li");
    let title = document.createElement("p");
    title.innerHTML = `<span>${task.number}.</span>${task.title}`
    taskList.className = "task";
    if (task.completed) {
      taskList.className = "task done";
    } else {
      taskList.className = "task";
    }
    
    taskList.setAttribute("data-id", task.id);
    taskList.appendChild(title);
    // Create Delete Button
    let options = document.createElement("div");
    let delBtn = document.createElement("a");
    delBtn.className = "delBtn";
    delBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    options.appendChild(delBtn);
    // Create Check Button
    let checkBtn = document.createElement("a");
    checkBtn.className = "checkBtn";
    checkBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
    options.appendChild(checkBtn);
    // Create Edit Button
    let editBtn = document.createElement("a");
    editBtn.className = "editBtn";
    editBtn.innerHTML = `<i class="fa-solid fa-pen-to-square"></i>`;
    options.appendChild(editBtn);
    taskList.appendChild(options);
    // Add Task Div To Tasks Container
    tasksContainer.appendChild(taskList);
  });
}

function addTasksToLocalStorageFrom(arrayOfTasks) {
  window.localStorage.setItem("tasks", JSON.stringify(arrayOfTasks));
}

function getDataFromLocalStorage() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    arrayOfTasks = JSON.parse(data);
    addElementsToPageFrom(arrayOfTasks);
  }
}

function deleteTaskWith(taskId) {
  arrayOfTasks = arrayOfTasks.filter((task) => task.id != taskId);
  addTasksToLocalStorageFrom(arrayOfTasks);
}

function toggleStatusTaskWith(taskID) {
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id === taskID) {
      arrayOfTasks[i].completed === false ? arrayOfTasks[i].completed = true : arrayOfTasks[i].completed = false;
    }
  }
  addTasksToLocalStorageFrom(arrayOfTasks);
}

function editTaskWith(taskID) {
  taskID = Number(taskID);
  for (let i = 0; i < arrayOfTasks.length; i++) {
    if (arrayOfTasks[i].id === taskID) {
      let title = prompt("Enter The New Task Title");
      if (title != null) {
        arrayOfTasks[i].title = title;
      }
    }
  }
  addTasksToLocalStorageFrom(arrayOfTasks);
  addElementsToPageFrom(arrayOfTasks);
}
