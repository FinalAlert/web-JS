// script.js
"use strict";

import {
    greet,
    add,
    multiply,
    subtract,
    divide,
    sumAll,
    getFullName,
} from "./utils.js";
import { users } from "./data.js";

const outputEl = document.getElementById("output");
let output = "";

// Перебір користувачів
users.forEach((user) => {
    const { firstName, lastName, age, city } = user;

    const fullName = getFullName(user);
    const greeting = greet(fullName);

    output += `${greeting}\n`;
    output += `Інформація: Вік — ${age}, Місто — ${city}\n`;
    output += `Операції: 10 + 5 = ${add(10, 5)}, 10 * 5 = ${multiply(10, 5)}\n`;
    output += `Сума чисел (1,2,3,4,5): ${sumAll(1, 2, 3, 4, 5)}\n`;

    const arr1 = [1, 2];
    const arr2 = [3, 4];
    const combined = [...arr1, ...arr2];

    output += `Об'єднаний масив: [${combined.join(", ")}]\n\n`;
});

// Вивід у консоль і на сторінку
console.log(output);
outputEl.textContent = output;
