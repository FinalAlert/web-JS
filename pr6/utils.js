// utils.js
"use strict";

// Привітання
export function greet(name) {
    return `Привіт, ${name}!`;
}

// Додавання
export const add = (a, b) => a + b;

// Множення
export const multiply = (a, b) => a * b;

// Різниця
export const subtract = (a, b) => a - b;

// Ділення
export const divide = (a, b) => (b !== 0 ? a / b : "На нуль ділити не можна");

// Підрахунок суми всіх аргументів
export const sumAll = (...nums) => nums.reduce((acc, num) => acc + num, 0);

// Функція для створення повного імені
export const getFullName = ({ firstName, lastName }) => `${firstName} ${lastName}`;
