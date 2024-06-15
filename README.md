# Playwright Framework

## Overview
This repository contains a UI Automation testing framework using Playwright and TypeScript, designed with the Page Object Model (POM) pattern.
All dymanic generated data, no hardcoding.

## Features
- **Playwright Integration:** Leverages Playwright for browser automation.
- **TypeScript Support:** Ensures type safety and modern JavaScript features.
- **Page Object Model:** Promotes modular and maintainable test code.

## Prerequisites
- Node.js (>=14.x)
- npm (>=6.x)

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/maile0/playwright-framework.git
   ```
2. Navigate to the project directory:
   ```bash
   cd playwright-framework
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

## Running Tests
To execute the tests, run:
```bash
npx playwright test
```

## Project Structure
- `tests/`: Contains the test scripts.
- `playwright.config.ts`: Configuration file for Playwright.
- `allure-report/`: Directory for Allure reports.
- `package.json`: Project metadata and dependencies.

## Reporting
The framework uses Allure for generating test reports. After running tests, generate the report with:
```bash
npx allure generate allure-results --clean -o allure-report
```
View the report:
```bash
npx allure open allure-report
```

For more details, visit the [repository](https://github.com/maile0/playwright-framework).
