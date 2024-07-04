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
