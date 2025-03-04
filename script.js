// 1. Створюємо змінні для різних типів даних
let userName;
let userAge;
let isStudent;

// 2. Запитуємо значення у користувача
userName = prompt("Введіть ваше ім'я:");
userAge = prompt("Введіть ваш вік:");
isStudent = prompt("Ви студент? (так/ні)").toLowerCase() === "так";

// 3. Виводимо типи даних у консоль
console.log("Тип userName:", typeof userName);
console.log("Тип userAge:", typeof userAge);
console.log("Тип isStudent:", typeof isStudent);

// Перетворюємо вік у число
userAge = Number(userAge);

// 4. Відображаємо анкету в HTML-документі
document.body.innerHTML = `
    <h2>Анкета користувача</h2>
    <p><strong>Ім'я:</strong> ${userName}</p>
    <p><strong>Вік:</strong> ${userAge}</p>
    <p><strong>Студент:</strong> ${isStudent ? "Так" : "Ні"}</p>
`;