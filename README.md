🚀 Cypress Automation Framework
A scalable, maintainable, and customizable automation framework built with Cypress for end-to-end testing.

📁 Project Structure
bash
Copy
Edit
├── cypress/
│   ├── e2e/
│   ├── fixtures/
│   └── support/pages/
├── cypress.config.js
├── package.json
├── .github/workflows/
└── README.md

⚙️ Features
✅ Page Object Model (POM)

✅ Custom Commands

✅ Faker for Test Data

✅ Allure and Mochawesome Reporting

✅ GitHub Actions CI/CD Pipeline

✅ Cypress Cloud Integration

🛠️ Installation

git clone https://github.com/M-Daaanish/ggms-qa-automation.git
cd ggms-qa-automation
npm install 


▶️ How To Run
Open Cypress in GUI Mode:
npx cypress open

Run in Headless Mode:
npx cypress run

🎯 Run a Specific Test
npx cypress run --spec cypress/e2e/login.cy.js

📊 Allure Reporting
To generate and view Allure reports: allure serve allure-results 

🔄 CI/CD Integration
This framework includes a GitHub Actions workflow that:

Installs dependencies

Runs Cypress tests in headless mode

Uploads reports as artifacts

📂 See .github/workflows/main.yml for the full pipeline.

🧰 Tech Stack

Cypress
Allure HTML Reporting
Faker.js	
GitHub Actions

💡 Design Patterns Used
Page Object Model (POM) for scalable and maintainable test structure

Custom Commands for code reusability

Fixtures to separate test data

Support Files for a cleaner setup
