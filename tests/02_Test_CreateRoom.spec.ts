import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { AdminPage } from '../Pages/AdminPage';
import { EditPage } from '../Pages/EditPage';


test.describe('Room Creation Tests', () => {
    let loginPage: LoginPage;
    let adminPage: AdminPage;
    let editPage: EditPage;

    // Define the login credentials
    const username = 'admin';
    const password = 'password';
    const expectedDashboardText = 'Front Page';

    // Run before each test scenario
    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);
        editPage = new EditPage(page);

        // Visit home page and perform login
        await loginPage.visitHomePage();
        await loginPage.login(username, password);

        // Validate the dashboard text
        await adminPage.verifyDashboardText(expectedDashboardText);
    });

    test('Create a new room successfully', async () => {
        const roomName = `00${Math.floor(100 + Math.random() * 900)}`;
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
    });



    test('Fail to create a room due to missing name', async () => {

        await adminPage.fillRoomDetails({
            type: 'Single',
            accessible: 'true',
            price: '199',
            amenities: {
                wifi: true,
                refreshments: true,
                tv: true,
                safe: true,
                radio: false,
                views: true
            }
        });

        // Submit room details
        await adminPage.submitRoomDetails();

        // Verify the error message
        await adminPage.verifyErrorMessage('Room name must be set');
    });


    test('Fail to create a room with invalid data', async () => {
        const roomName = `00${Math.floor(100 + Math.random() * 900)}`;
        const roomPrice = Math.floor(Math.random() * 9999).toString();
    
        await adminPage.fillRoomDetails({
            name: roomName,
            type: 'Single',
            accessible: 'true',
            price: roomPrice,
            amenities: {
                wifi: true,
                refreshments: true,
                tv: false,
                safe: true,
                radio: true,
                views: true
            }
        });
    
        await adminPage.submitRoomDetails();
        await editPage.verifyErrorMessagePrice('must be less than or equal to 999'); //error message 
    });
    
    test('Fail to create a room with empty room name', async () => {
        
        const roomPrice = Math.floor(Math.random() * 300).toString();
    
        await adminPage.fillRoomDetails({
            type: 'Single',
            accessible: 'true',
            price: roomPrice,
            amenities: {
                wifi: true,
                refreshments: true,
                tv: false,
                safe: true,
                radio: true,
                views: true
            }
        });
    
        await adminPage.submitRoomDetails();
        await adminPage.verifyErrorMessage('Room name must be set');

    });

});
