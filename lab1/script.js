"use strict";

class PersonalInfo {
    constructor(name, email, phone, age, address) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.age = age;
        this.address = address;
    }
}

class Experience {
    constructor(company, position, period, description) {
        this.company = company;
        this.position = position;
        this.period = period;
        this.description = description;
    }
}

class Education {
    constructor(institution, degree, year) {
        this.institution = institution;
        this.degree = degree;
        this.year = year;
    }
}

class Skills {
    constructor(skills) {
        this.skills = skills;
    }
}

class Resume {
    constructor(personalInfo, experiences = [], educations = [], skills = []) {
        this.personalInfo = personalInfo;
        this.experiences = experiences;
        this.educations = educations;
        this.skills = skills;
    }

    display() {
        const resumeContainer = document.getElementById('resume-container');
        resumeContainer.innerHTML = this.generateHTML();
    }

    generateHTML() {
        return `
            <div class="resume">
                <div class="personal-info">
                    <h2>Особиста інформація</h2>
                    <p><strong>Ім'я:</strong> ${this.personalInfo.name}</p>
                    <p><strong>Email:</strong> ${this.personalInfo.email}</p>
                    <p><strong>Телефон:</strong> ${this.personalInfo.phone}</p>
                    <p><strong>Вік:</strong> ${this.personalInfo.age}</p>
                    <p><strong>Адреса:</strong> ${this.personalInfo.address}</p>
                </div>

                ${this.experiences.length ? `
                <div class="experience">
                    <h2>Досвід роботи</h2>
                    ${this.experiences.map(exp => `
                        <div class="job">
                            <h3>${exp.company}</h3>
                            <p><strong>Посада:</strong> ${exp.position}</p>
                            <p><strong>Період:</strong> ${exp.period}</p>
                            <p>${exp.description}</p>
                        </div>
                    `).join('')}
                </div>
                ` : ''}

                ${this.skills.skills.length ? `
                <div class="skills">
                    <h2>Навички</h2>
                    <ul>
                        ${this.skills.skills.map(skill => `<li>${skill}</li>`).join('')}
                    </ul>
                </div>
                ` : ''}
            </div>
        `;
    }
}

function collectPersonalInfo() {
    const name = prompt("Введіть ваше ім'я:");
    const email = prompt("Введіть ваш email:");
    const phone = prompt("Введіть ваш телефон:");
    const age = prompt("Введіть ваш вік:");
    const address = prompt("Введіть вашу адресу:");

    return new PersonalInfo(name, email, phone, age, address);
}

function collectExperiences() {
    const experiences = [];
    let addMore = true;

    while (addMore) {
        const company = prompt("Назва компанії:");
        const position = prompt("Посада:");
        const period = prompt("Період роботи:");
        const description = prompt("Опис обов'язків:");

        experiences.push(new Experience(company, position, period, description));

        addMore = confirm("Додати ще один досвід роботи?");
    }

    return experiences;
}

function collectSkills() {
    const skillsInput = prompt("Введіть ваші навички через кому:");
    const skills = skillsInput.split(',').map(skill => skill.trim());
    return new Skills(skills);
}

function createResume() {
    const personalInfo = collectPersonalInfo();
    const experiences = collectExperiences();
    const skills = collectSkills();

    const resume = new Resume(personalInfo, experiences, [], skills);
    resume.display();

    localStorage.setItem('resume', JSON.stringify(resume));
}

function loadResumeFromStorage() {
    const savedResume = localStorage.getItem('resume');
    if (savedResume) {
        const parsed = JSON.parse(savedResume);
        const resume = new Resume(
            new PersonalInfo(
                parsed.personalInfo.name,
                parsed.personalInfo.email,
                parsed.personalInfo.phone,
                parsed.personalInfo.age,
                parsed.personalInfo.address
            ),
            parsed.experiences,
            [],
            new Skills(parsed.skills.skills)
        );
        resume.display();
    }
}

function clearResume() {
    if (confirm("Ви впевнені, що хочете очистити резюме?")) {
        localStorage.removeItem('resume');
        document.getElementById('resume-container').innerHTML = '';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('create-resume').addEventListener('click', createResume);
    document.getElementById('edit-resume').addEventListener('click', createResume);
    document.getElementById('clear-resume').addEventListener('click', clearResume);

    loadResumeFromStorage();
});