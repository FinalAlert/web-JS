"use strict";
console.log("Підключено JavaScript для Практичної роботи №2");

// Завдання 2. Функції та їх оголошення
function greet() {
    console.log("Привіт, світ!");
}
greet();
greet();

const multiply = function(a, b) {
    return a * b;
};
console.log(multiply(4, 5)); // 20

const divide = (a, b) => a / b;
console.log(divide(20, 4)); // 5

// Завдання 3. Параметри, повернення та області видимості
function square(x) {
    return x * x;
}
console.log(square(6)); // 36

if (true) {
    let localVar = "Я в блоці";
    console.log(localVar); // Працює
}
// console.log(localVar); // ReferenceError

// Завдання 4. Замикання та контекст this
function createCounter() {
    let count = 0;
    return function() {
        count++;
        return count;
    };
}
const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

const person = {
    name: "Олена",
    sayHello() {
        console.log(`Привіт, мене звуть ${this.name}`);
    }
};
person.sayHello();

// Каррінг
function add(a) {
    return function(b) {
        return a + b;
    };
}
const addTen = add(10);
console.log(addTen(5)); // 15

// Завдання 5.1: Комплексна функціональна анкета
function createSurvey() {
    const name = prompt("Введіть ім'я:");
    const age = Number(prompt("Введіть вік:"));
    const city = prompt("Введіть місто:");

    return { name, age, city, isAdult: age >= 18 };
}

function displaySurvey(surveyData) {
    console.log(surveyData);
    alert(`Ім'я: ${surveyData.name}\nВік: ${surveyData.age}\nМісто: ${surveyData.city}\nПовнолітній: ${surveyData.isAdult ? "Так" : "Ні"}`);
}

const survey = createSurvey();
displaySurvey(survey);

// Завдання 5.2: Калькулятор конвертації температур
function createConverter(coef, offset) {
    return function(temp) {
        return temp * coef + offset;
    };
}

const cToF = createConverter(9 / 5, 32);
const fToC = createConverter(5 / 9, -32 * (5 / 9));

const temperature = Number(prompt("Введіть температуру:"));
const direction = prompt("Оберіть напрям (введіть 'C to F' або 'F to C'):");

let result;
if (direction === "C to F") {
    result = cToF(temperature);
} else if (direction === "F to C") {
    result = fToC(temperature);
} else {
    alert("Невірний напрям конвертації");
}

if (result !== undefined) {
    console.log(`Результат: ${result}`);
    alert(`Результат: ${result}`);
}
