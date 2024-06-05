import { test, expect, Page } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage';
import { AdminPage } from '../Pages/AdminPage';
import { EditPage } from '../Pages/EditPage';

test.describe('Edit Room Tests', () => {
    let loginPage: LoginPage;
    let adminPage: AdminPage;
    let editPage: EditPage;
    let createdRoomName: string; // Store the name of the room created for editing

    const username = 'admin';
    const password = 'password';
    const expectedDashboardText = 'Front Page';

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        adminPage = new AdminPage(page);
        editPage = new EditPage(page);

        await loginPage.visitHomePage();
        await loginPage.login(username, password);

        await adminPage.verifyDashboardText(expectedDashboardText);
    });

    test('create and edit a room successfully', async ({ page }) => {
        // Create a new room
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

        createdRoomName = roomName; // Store the created room name for editing

        // Edit the room details
        const newRoomName = `00${Math.floor(100 + Math.random() * 900)}`;
        const newRoomPrice = Math.floor(Math.random() * 300).toString();
        const newRoomDescription = 'Some description here text text text';
        const newRoomType = 'Double';

        await editPage.clickOnCreatedRoom(createdRoomName); // Click on the newly created room
        await editPage.clickEditButton();

        await editPage.changeRoomType(newRoomType); // Change room type to Double
        await editPage.editRoomDetails({
            name: newRoomName,
            price: newRoomPrice,
            description: newRoomDescription,
            amenities: {
                wifi: false,
                tv: false
            }
        });

        await editPage.clickUpdateButton();
        page.setDefaultNavigationTimeout(3000);
        // Validate updated room details
        await editPage.validateUpdatedDetails(newRoomName, newRoomType, newRoomDescription, newRoomPrice, false, false); // Assuming both WiFi and TV are disabled in this case
    });

   
   
   
   
    // Negative test case
    test('create and fail to edit a room with invalid data', async () => {
        
         // Create a new room
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
 
         createdRoomName = roomName; // Store the created room name for editing
 
         // Edit the room details
         const newRoomName = `00${Math.floor(100 + Math.random() * 900)}`;
         const newRoomPrice = Math.floor(Math.random() * 9000) + 1000; /// it's always putting a 4-digit price 
         const newRoomDescription = 'Some description here text text text';
         const newRoomType = 'Double';
 
         await editPage.clickOnCreatedRoom(createdRoomName); // Click on the newly created room
         await editPage.clickEditButton();
 
         await editPage.changeRoomType(newRoomType); // Change room type to Double
         await editPage.editRoomDetails({
             name: newRoomName,
             price: newRoomPrice.toString(), // converts the generated number (newRoomPrice) to a string! 
             description: newRoomDescription,
             amenities: {
                 wifi: false,
                 tv: false
             }
         });
 
         await editPage.clickUpdateButton();
         await editPage.verifyErrorMessagePrice('must be less than or equal to 999'); //error message 
    });

});
