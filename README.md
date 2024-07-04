# Es6-JavaScript-assignment

Project Assignment: Build a To-Do List Application Using ES6 JavaScript

## Objective:
Create a fully functional To-Do List application using ES6 JavaScript. This project will help you understand and apply ES6 features, such as classes, modules, arrow functions, template literals, and the fetch API.

## Requirements:

### User Interface:

A clean, intuitive user interface that allows users to add, edit, delete, and mark tasks as complete.
Tasks should be displayed in a list format.
Each task should have a title, description, due date, and a checkbox to mark it as complete.

### Features:

Add Task: Allow users to add a new task with a title, description, and due date.
Edit Task: Allow users to edit the details of an existing task.
Delete Task: Allow users to delete a task.
Complete Task: Allow users to mark a task as complete or incomplete.
Filter Tasks: Provide options to filter tasks by their completion status (e.g., all, completed, incomplete).
Persist Data: Store the tasks in the browser's local storage so that the list persists across page reloads.
Fetch Tasks: Optionally, allow users to fetch tasks from a provided API endpoint and display them in the list.

### Code Structure:

Use ES6 classes to create the task objects and manage the to-do list.
Separate your code into modules to keep it organized and maintainable.
Use ES6 arrow functions, template literals, and other modern syntax features.

### Styling:

Style the application using CSS to make it visually appealing.
Ensure the application is responsive and works well on different screen sizes.

### Documentation:

Comment your code to explain the functionality of different parts.
Write a README file to explain how to set up and run the project, as well as an overview of the application's features.

## Implementation Steps:

### Setup:

Create a new project directory and initialize it with npm (optional).
Set up your project structure with separate folders for HTML, CSS, and JavaScript files.

### HTML:

Create the basic structure of the HTML file with a container for the to-do list and form elements for adding tasks.

### CSS:

Style the application to make it user-friendly and visually appealing.

### JavaScript:

Task Class: Create a class to represent a task with properties like title, description, due date, and completion status.
ToDoList Class: Create a class to manage the list of tasks, including methods to add, edit, delete, and filter tasks.
Local Storage: Implement methods to save and retrieve tasks from the local storage.
Event Listeners: Add event listeners to handle user interactions, such as adding, editing, and deleting tasks.
Fetch API: Optionally, add functionality to fetch tasks from an external API and populate the list.



## index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Work To-Dos</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>WORK TO-DOS</h1>
        <p>Enter text into the input field to add items to your list.</p>
        <p>Click the item to mark it as complete.</p>
        <p>Click the "X" to remove the item from you list.</p>
        <br>
        <br>
        <input type="text" id="new-task" placeholder="New item...">
        <button id="add-task-button">
            <img src="C:\Users\user\Downloads\pencil.png" alt="Add Task">
        </button>
        <ul id="task-list"></ul>
    </div>
    <script type="module" src="main.js"></script>
</body>
</html>
```


## styles.css

```
body {
    font-family: Arial, sans-serif;
    background-color: #03A9F4; 
    color: #fff; 
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
}

.container {
    text-align: center;
    width: 90%;
    max-width: 600px;
}

h1 {
    font-size: 3em; 
    color: #fff; 
}

p {
    font-size: 1.1em;
    margin: 5px 0;
}

p:nth-of-type(1) {
    color: #ffd700; 
}

p:nth-of-type(2) {
    color: #32cd32; 
}

p:nth-of-type(3) {
    color: #000; 
}


input[type="text"] {
    padding: 10px;
    margin: 10px 0;
    width: calc(100% - 40px);
    max-width: 400px;
    border: none;
    border-radius: 5px;
}

button {
    padding: 10px;
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 5px;
}

button img {
    width: 20px;
    height: 20px;
}


ul {
    list-style-type: none;
    padding: 0;
}

li {
    background-color: #fff;
    color: #000;
    padding: 10px;
    margin: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 5px;
    position: relative;
}

li.complete {
    text-decoration: line-through;
}


button.delete {
    background-color: #ff6347;
    border: none;
    color: #fff;
    padding: 5px;
    cursor: pointer;
    border-radius: 5px;
}

button.delete:hover {
    background-color: #e53e3e;
}


button.edit {
    background-color: transparent;
    border: none;
    cursor: pointer;
    position: absolute;
    right: 40px;
}

button.edit img {
    width: 20px;
    height: 20px;
}
```


## main.js

```
import Task from './task.js';
import ToDoList from './todolist.js';

const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task-button');
const taskListElement = document.getElementById('task-list');

const todoList = new ToDoList(taskListElement);

addTaskButton.addEventListener('click', () => {
    const title = taskInput.value.trim();
    if (title) {
        todoList.addTask(new Task(title));
        taskInput.value = '';
    }
});

taskListElement.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete')) {
        const id = event.target.parentElement.dataset.id;
        todoList.deleteTask(id);
    } else if (event.target.classList.contains('edit')) {
        const id = event.target.parentElement.dataset.id;
        todoList.editTask(id);
    } else if (event.target.tagName === 'LI') {
        const id = event.target.dataset.id;
        todoList.toggleCompleteTask(id);
    }
});
```

## task.js

```
export default class Task {
    constructor(title, description = '', dueDate = '', completed = false) {
        this.id = Date.now().toString();
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.completed = completed;
    }
}
```


## todolist.js

```
export default class ToDoList {
    constructor(taskListElement) {
        this.taskListElement = taskListElement;
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        this.render();
    }

    addTask(task) {
        this.tasks.push(task);
        this.saveTasks();
        this.render();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.saveTasks();
        this.render();
    }

    toggleCompleteTask(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.render();
        }
    }

    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    render() {
        this.taskListElement.innerHTML = '';
        this.tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.dataset.id = task.id;
            taskElement.textContent = task.title;
            if (task.completed) {
                taskElement.classList.add('complete');
            }
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'X';
            deleteButton.classList.add('delete');
            taskElement.appendChild(deleteButton);
            this.taskListElement.appendChild(taskElement);
        });
    }
}
```


## OUTPUT

![output](https://github.com/SmritiManikand/Es6-JavaScript-assignment/assets/113674204/b76234b0-41d7-4e73-94eb-80867c0fbfbc)

