const {test, expect, request} = require('@playwright/test');
const {APIUtils} = require('../utils/APIUtils');

const loginData = {userEmail: "memopasos@hotmail.com", userPassword: "Test1234"};
const createOrderPayload = {orders: [{country: "Mexico", productOrderedId: "6581ca399fd99c85e8ee7f45"}]};
let webContext;

test.beforeAll(async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/client');
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    await username.fill('memopasos@hotmail.com');
    await password.fill('Test1234');
    await signInBtn.click();
    await page.waitForLoadState('networkidle');
    webContext = await browser.newContext({storageState:'state.json'})
});

test('Web API', async ()=>{
    const page = await webContext.newPage()
    await page.goto('https://rahulshettyacademy.com/client');
})