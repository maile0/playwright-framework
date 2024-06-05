import { expect, Page, Locator } from "@playwright/test";
import { error } from "console";

export class EditPage {
    readonly page: Page;
    readonly allRoomsBtn: Locator;
    readonly editBtn: Locator;
    readonly updateBtn: Locator;
    readonly cancelBtn: Locator;
    readonly roomNameEditInput: Locator;
    readonly roomTypeEditInput: Locator;
    readonly roomPriceEditInput: Locator;
    readonly addDescriptionInput: Locator;
    readonly wifiChangeBox: Locator;
    readonly tvChangeBox: Locator;
    readonly roomDetailsBox: Locator;
    readonly errorMessagePrice: Locator;

    constructor(page: Page) {
        this.page = page;
        this.allRoomsBtn = page.locator('a.nav-link', { hasText: 'Rooms' });
        this.editBtn = page.locator('button.btn.btn-outline-primary');
        this.updateBtn = page.locator('#update');
        this.cancelBtn = page.locator('#cancelEdit');
        this.roomNameEditInput = page.locator('#roomName');
        this.roomTypeEditInput = page.locator('#type');
        this.roomPriceEditInput = page.locator('#roomPrice');
        this.addDescriptionInput = page.locator('#description');
        this.wifiChangeBox = page.locator('#wifiCheckbox');
        this.tvChangeBox = page.locator('#tvCheckbox');
        this.roomDetailsBox = page.locator('.room-details');
        this.errorMessagePrice = page.locator('.alert.alert-danger');
    }

    async navigateToAllRooms() {
        await this.allRoomsBtn.click();
    }

    async clickEditButton() {
        await this.editBtn.click();
    }

    async clickUpdateButton() {
        await this.updateBtn.click();
    }

    async clickOnCreatedRoom(roomName: string) {
        const roomLocator = this.page.locator(`div[data-testid="roomlisting"] p:has-text("${roomName}")`);
        await roomLocator.click();
    }

    async editRoomDetails(newDetails: {
        name: string,
        price: string,
        description: string,
        amenities: {
            wifi: boolean,
            tv: boolean
        }
    }) {
        await this.roomNameEditInput.fill(newDetails.name);
        await this.roomPriceEditInput.fill(newDetails.price);
        await this.addDescriptionInput.fill(newDetails.description);
        if (newDetails.amenities.wifi) {
            await this.wifiChangeBox.check();
        } else {
            await this.wifiChangeBox.uncheck();
        }
        if (newDetails.amenities.tv) {
            await this.tvChangeBox.check();
        } else {
            await this.tvChangeBox.uncheck();
        }
    }

    async changeRoomType(newType: string) {
        const roomTypeDropdown = this.page.locator('#type');
        await roomTypeDropdown.selectOption({ label: newType });
    }

    async getRoomDetails() {
        const roomDetails = await this.roomDetailsBox.locator('div.col-sm-6').innerText();
        return roomDetails;
    }


    async validateUpdatedDetails(newRoomName: string, newRoomType: string, newRoomDescription: string, newRoomPrice: string, wifiEnabled: boolean, tvEnabled: boolean) {
        const roomNameElement = await this.page.locator(`.room-details h2:has-text("${newRoomName}")`).innerText();
        const roomTypeElement = await this.page.locator(`.room-details p:has-text("Type: ${newRoomType}")`).innerText();
        const descriptionElement = await this.page.locator(`.room-details p:has-text("Description: ${newRoomDescription}")`).innerText();
        const priceElement = await this.page.locator(`.room-details p:has-text("Room price: ${newRoomPrice}")`).innerText();
        const featuresElement = await this.page.locator(`.room-details p:has-text("Features:")`).innerText();
    
        expect(roomNameElement).toContain(newRoomName);
        expect(roomTypeElement).toContain(newRoomType);
        expect(descriptionElement).toContain(newRoomDescription);
        expect(priceElement).toContain(newRoomPrice);
    
        if (wifiEnabled) {
            expect(featuresElement).toContain('WiFi');
        } else {
            expect(featuresElement).not.toContain('WiFi');
        }
    
        if (tvEnabled) {
            expect(featuresElement).toContain('TV');
        } else {
            expect(featuresElement).not.toContain('TV');
        }
    }
    
    async verifyErrorMessagePrice(expectedMessagePrice: string) {
        await expect(this.errorMessagePrice).toHaveText(expectedMessagePrice);
    }

}
