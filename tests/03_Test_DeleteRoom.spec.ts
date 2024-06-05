import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { AdminPage } from '../Pages/AdminPage';

test.describe('Room Deletion Tests', () => {
    let loginPage: LoginPage;
    let adminPage: AdminPage;

    const username = 'admin';
    const password = 'password';
    const expectedDashboardText = 'Front Page';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);

        await loginPage.visitHomePage();
        await loginPage.login(username, password);

        await adminPage.verifyDashboardText(expectedDashboardText);
    });

    test('delete a room successfully', async () => {
        const roomName = `delete${Math.floor(100 + Math.random() * 900)}`;
        const roomPrice = Math.floor(Math.random() * 300).toString();
    
        await adminPage.fillRoomDetails({
            name: roomName,
            type: 'Single',
            accessible: 'true',
            price: roomPrice,
            amenities: {
                wifi: true,
                refreshments: true,
                tv: true,
                safe: true,
                radio: false,
                views: true
            }
        });
    
        await adminPage.submitRoomDetails();
        await adminPage.verifyRoomInList(roomName);
    
        await adminPage.deleteRoom(roomName);
    });


        // Negative test case: Attempt to delete a non-existent room
        test('attempt to delete a non-existent room', async () => {
            const nonExistentRoomName = `Room${Math.floor(100 + Math.random() * 900)}_NonExistent`;
    
            // Try to delete a room that doesn't exist
            await adminPage.attemptDeleteNonExistentRoom(nonExistentRoomName);
        });
});

