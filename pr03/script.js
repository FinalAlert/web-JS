"use strict";

// 4.1 Комплексне завдання: Бібліотека користувачів
class UserLibrary {
    constructor(name, age, profession) {
        this.name = name;
        this.age = age;
        this.profession = profession;
    }

    display() {
        console.log(`Користувач: ${this.name}, Вік: ${this.age}, Професія: ${this.profession}`);
    }
}

class Admin extends UserLibrary {
    constructor(name, age, profession, role) {
        super(name, age, profession);
        this.role = role;
    }

    display() {
        console.log(`Адміністратор: ${this.name}, Вік: ${this.age}, Професія: ${this.profession}, Роль: ${this.role}`);
    }
}

// Інтерактивна частина
const userName = prompt("Введіть ім'я користувача:");
const userAge = parseInt(prompt("Введіть вік користувача:"));
const userProfession = prompt("Введіть професію користувача:");

if (userName && userAge > 0 && userProfession) {
    const user = new UserLibrary(userName, userAge, userProfession);
    user.display();

    const adminRole = prompt("Введіть роль адміністратора (якщо це адмін):");
    if (adminRole) {
        const admin = new Admin(userName, userAge, userProfession, adminRole);
        admin.display();
    }
} else {
    alert("Невірні дані! Будь ласка, введіть коректні значення.");
}

// Самостійне завдання: Власний проєкт OOP
class Animal {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    speak() {
        console.log(`${this.name} видає звук.`);
    }
}

class Dog extends Animal {
    constructor(name, age, breed) {
        super(name, age);
        this.breed = breed;
    }

    speak() {
        console.log(`${this.name} гавкає!`);
    }

    displayInfo() {
        console.log(`Собака: ${this.name}, Вік: ${this.age}, Порода: ${this.breed}`);
    }
}

const dog1 = new Dog("Бобік", 5, "Вівчарка");
dog1.speak();
dog1.displayInfo();

// Live-coding demo

// 1. Створення об’єкта за допомогою об’єктного літералу і виклик його методу
const book = {
    title: "JavaScript для початківців",
    author: "Іван Іванов",
    year: 2023,
    displayInfo() {
        console.log(`Книга: ${this.title}, Автор: ${this.author}, Рік видання: ${this.year}`);
    }
};

book.displayInfo(); // Виклик методу об’єкта

// 2. Реалізація класу з наслідуванням
class Vehicle {
    constructor(type, speed) {
        this.type = type;
        this.speed = speed;
    }

    move() {
        console.log(`${this.type} рухається зі швидкістю ${this.speed} км/год.`);
    }
}

class Car extends Vehicle {
    constructor(type, speed, brand) {
        super(type, speed); // Виклик конструктора батьківського класу
        this.brand = brand;
    }

    displayInfo() {
        console.log(`Автомобіль: ${this.brand}, Тип: ${this.type}, Швидкість: ${this.speed} км/год.`);
    }
}

const car1 = new Car("Легковий", 120, "Toyota");
car1.move(); // Виклик методу з батьківського класу
car1.displayInfo(); // Виклик методу з дочірнього класу

// 3. Приклад використання bind() для збереження контексту this
const user = {
    name: "Петро",
    greet() {
        console.log(`Привіт, мене звуть ${this.name}`);
    }
};

const greetFunction = user.greet.bind(user); // Зв'язуємо контекст this з об'єктом user
setTimeout(greetFunction, 1000); // Через 1 секунду виведе: "Привіт, мене звуть Петро"