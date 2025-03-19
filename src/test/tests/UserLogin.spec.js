const { test, chromium, expect } = require('@playwright/test');
const { LoginPage } = require('../Pages/LoginPage');
const { ProductPage } = require('../Pages/ProductPage');

let context;
let page;
let loginPage;

test.beforeAll(async () => {
    context = await chromium.launchPersistentContext('user-data-dir', {
        headless: false,
    });
});

test.beforeEach(async () => {
    page = await context.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goTo();
});

test('userValidLogin', async () => {
    await loginPage.login();
});

test('userInvalidLogin', async () => {
    await loginPage.invalidLogin();
    await expect(page.locator("//h3[@data-test='error']")).toHaveText(
        /Username and password do not match any user in this service/
    );
    console.log("Login failed with invalid credentials");


});

test('userBuyProducts', async () => {

    await loginPage.login();
    let products = new ProductPage(page);
});




test.afterEach(async () => {
    // await page.close();
});

test.afterAll(async () => {
    await page.pause();
    //await context.close();
});