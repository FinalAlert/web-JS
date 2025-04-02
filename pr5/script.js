document.addEventListener('DOMContentLoaded', () => {
    const loadDataBtn = document.getElementById('loadDataBtn');
    const userDataContainer = document.getElementById('userData');
    const errorContainer = document.getElementById('errorContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');

    // API endpoint для отримання користувачів
    const API_URL = 'https://jsonplaceholder.typicode.com/users';

    loadDataBtn.addEventListener('click', async () => {
        // Очистити попередні дані та помилки
        userDataContainer.textContent = '';
        errorContainer.textContent = '';

        // Показати індикатор завантаження
        loadingIndicator.style.display = 'block';
        loadDataBtn.disabled = true;

        try {
            // Виконати запит до API
            const response = await fetch(API_URL);

            // Перевірити, чи запит був успішним
            if (!response.ok) {
                throw new Error(`Помилка HTTP: ${response.status}`);
            }

            // Отримати дані у форматі JSON
            const users = await response.json();

            // Відформатувати та відобразити дані
            userDataContainer.textContent = JSON.stringify(users, null, 2);
        } catch (error) {
            // Показати помилку, якщо щось пішло не так
            errorContainer.textContent = `Сталася помилка: ${error.message}`;
        } finally {
            // Приховати індикатор завантаження
            loadingIndicator.style.display = 'none';
            loadDataBtn.disabled = false;
        }
    });
});