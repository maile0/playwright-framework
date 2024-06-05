import { test } from "@playwright/test";
import { LoginPage } from '../Pages/LoginPage';
import { AdminPage } from '../Pages/AdminPage';

test('Login Test', async ({ page }) => {
    // Initialize the page objects
    const loginPage = new LoginPage(page);
    const adminPage = new AdminPage(page);

    // Define the login credentials
    const username = 'admin';
    const password = 'password';

    // Define the expected dashboard text
    const expectedDashboardText = 'Front Page';

    // Visit the home page and perform login
    await loginPage.visitHomePage();
    await loginPage.login(username, password);

    // Validate the dashboard text
    await adminPage.verifyDashboardText(expectedDashboardText);
});
