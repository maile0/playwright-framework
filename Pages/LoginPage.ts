import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {

    // Define selectors
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly collapseBanner: Locator;

    // Init selectors using constructor

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#username');
        this.passwordInput = page.locator('#password');
        this.submitButton = page.locator('#doLogin');
        this.collapseBanner = page.locator('.col-2.text-center');
    }

    // Define login page methods

    async visitHomePage() {
        await this.page.goto('https://automationintesting.online/#/admin');
        await this.collapseBanner.click();
        //await this.page.waitForTimeout(1000);
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

}