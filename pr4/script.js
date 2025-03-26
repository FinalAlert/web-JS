"use strict";

// Отримуємо елементи DOM
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');

// Функція для додавання нового завдання
function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Будь ласка, введіть завдання!');
        return;
    }

    // Створюємо новий елемент списку
    const listItem = document.createElement('li');

    // Створюємо текст завдання
    const taskTextSpan = document.createElement('span');
    taskTextSpan.textContent = taskText;

    // Створюємо кнопку видалення
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Видалити';
    deleteButton.className = 'delete-btn';

    // Додаємо елементи до списку
    listItem.appendChild(taskTextSpan);
    listItem.appendChild(deleteButton);
    taskList.appendChild(listItem);

    // Очищаємо поле введення
    taskInput.value = '';

    // Логуємо дію в консоль
    console.log(`Додано нове завдання: "${taskText}"`);
}

// Додаємо обробник події для кнопки "Додати"
addTaskButton.addEventListener('click', addTask);

// Додаємо обробник події для клавіші Enter
taskInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Використовуємо делегування подій для видалення завдань
taskList.addEventListener('click', function(e) {
    if (e.target.classList.contains('delete-btn')) {
        const listItem = e.target.parentElement;
        const taskText = listItem.querySelector('span').textContent;

        // Видаляємо елемент
        listItem.remove();

        // Логуємо дію в консоль
        console.log(`Видалено завдання: "${taskText}"`);
    }
});