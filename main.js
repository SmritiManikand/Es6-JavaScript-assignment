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
