import { expect, Locator, Page } from "@playwright/test";

export class AdminPage {

    // Define selectors
    readonly page: Page;
    readonly dashboardTxt: Locator;
    readonly createBtn: Locator;
    readonly roomName: Locator;
    readonly roomType: Locator;
    readonly roomAccessible: Locator;
    readonly roomPrice: Locator;
    readonly wifiCheckbox: Locator;
    readonly refrshmentsCheckbox: Locator;
    readonly tvCheckbox: Locator;
    readonly safeCheckbox: Locator;
    readonly radioCheckbox: Locator;
    readonly viewsCheckbox: Locator;
    readonly errorMessage: Locator;

    // Init selectors using constructor
    constructor(page: Page) {
        this.page = page;
        this.dashboardTxt = page.locator('#frontPageLink');
        this.createBtn = page.locator('#createRoom');
        this.roomName = page.locator('#roomName');
        this.roomType = page.locator('#type');
        this.roomAccessible = page.locator('#accessible');
        this.roomPrice = page.locator('#roomPrice');
        this.wifiCheckbox = page.locator('#wifiCheckbox');
        this.refrshmentsCheckbox = page.locator('#refreshCheckbox');
        this.tvCheckbox = page.locator('#tvCheckbox');
        this.safeCheckbox = page.locator('#safeCheckbox');
        this.radioCheckbox = page.locator('#radioCheckbox');
        this.viewsCheckbox = page.locator('#viewsCheckbox');
        this.errorMessage = page.locator('.alert.alert-danger');
    }

    // Navigate to Admin Page
    async navigateToAdminPage() {
        await this.page.goto('https://automationintesting.online/#/admin');
    }

    // Verify dashboard text
    async verifyDashboardText(expectedText: string) {
        await expect(this.dashboardTxt).toHaveText(expectedText);
    }

    async navigate() {
        await this.page.goto('https://automationintesting.online/#/admin');
    }

    async submitRoomDetails() {
        await this.createBtn.click();
    }

    // Fill in room details
    async fillRoomDetails(details: {
        name?: string, // Make the name optional for negative testing
        type: string,
        accessible: string,
        price: string,
        amenities: {
            wifi: boolean,
            refreshments: boolean,
            tv: boolean,
            safe: boolean,
            radio: boolean,
            views: boolean
        }
    }) {
        if (details.name) await this.roomName.fill(details.name);
        await this.roomType.selectOption(details.type);
        await this.roomAccessible.selectOption(details.accessible);
        await this.roomPrice.fill(details.price);

        if (details.amenities.wifi) await this.wifiCheckbox.check();
        if (details.amenities.refreshments) await this.refrshmentsCheckbox.check();
        if (details.amenities.tv) await this.tvCheckbox.check();
        if (details.amenities.safe) await this.safeCheckbox.check();
        if (details.amenities.radio) await this.radioCheckbox.check();
        if (details.amenities.views) await this.viewsCheckbox.check();
    }

    async verifyRoomInList(name: string) {
        const roomNameLocator = this.page.locator(`div[data-testid="roomlisting"] p:has-text("${name}")`);
        await expect(roomNameLocator).toBeVisible();
    }

    async verifyErrorMessage(expectedMessage: string) {
        await expect(this.errorMessage).toHaveText(expectedMessage);
    }

    async deleteRoom(name: string) {
        const roomLocator = this.page.locator(`div[data-testid="roomlisting"]:has(p:has-text("${name}"))`);
        const deleteButtonLocator = roomLocator.locator('span.fa-remove');

        await expect(roomLocator).toBeVisible();

        await deleteButtonLocator.click();

        await expect(roomLocator).not.toBeVisible();
    }

    async attemptDeleteNonExistentRoom(name: string) {
        const roomLocator = this.page.locator(`div[data-testid="roomlisting"]:has(p:has-text("${name}"))`);
        await expect(roomLocator).not.toBeVisible();
        console.log(`Room with name "${name}" does not exist and thus cannot be deleted.`);
    }
}
