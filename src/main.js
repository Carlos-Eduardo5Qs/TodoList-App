import from from './assets/css/style.css';

const display = document.querySelector('.input-fields input');
const buttonAdd = document.querySelector('.buttonAdd');
const todoListApp = document.querySelector('.todoListApp');
const pendingTasks = document.querySelector('.pendingTasks');
const buttonDelete = document.querySelector('.ri-delete-bin-6-line');
const clearAllTasks = document.querySelector('.buttonClear');

buttonAdd.addEventListener('click', function () {
    if (!display.value) {
        return alert('Saudações, para adicionar uma tarefa é nescessário preencher o campo de texto logo abaixo.');
    };

    addTask(display.value);
});

display.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!display.value) {
            return alert('Saudações, para adicionar uma tarefa é nescessário preencher o campo de texto logo abaixo.');
        };

        addTask(display.value);
    };
});

document.addEventListener('click', function (e) {
    const element = e.target;

    if (element.classList.contains('ri-delete-bin-6-line')) {
        element.parentNode.remove();
    };

    dataBase();
});

function addTask(valueDisplay) {
    const li = createElement();
    li.classList.add('list_item');
    li.innerHTML = `${valueDisplay} <i class="ri-delete-bin-6-line"></i>`;
    todoListApp.appendChild(li);
    clear();
    dataBase();
};

function createElement() {
    const li = document.createElement('li');
    return li;
};

function clear() {
    display.value = '';
    display.focus();
};

clearAllTasks.addEventListener('click', function () {
    const listItem = todoListApp.querySelectorAll('li');

    for (let list of listItem) {
        list.remove();
    };
});

function dataBase() {
    const tasks = todoListApp.querySelectorAll('li');
    const listTasks = [];

    for (let task of tasks) {
        const taskText = task.innerText;
        listTasks.push(taskText);
    };

    const taskJSON = JSON.stringify(listTasks);
    localStorage.setItem('tasks', taskJSON);
};

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const listTasks = JSON.parse(tasks);

    for (let task of listTasks) {
        addTask(task);
    };
};

addSavedTasks();

setInterval(function () {
    const listItem = todoListApp.querySelectorAll('li');
    pendingTasks.innerText = listItem.length;
}, 1);