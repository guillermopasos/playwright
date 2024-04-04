const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../utils/APIUtils');

const loginData = { userEmail: "memopasos@hotmail.com", userPassword: "Test1234" };
const createOrderPayload = { orders: [{ country: "Mexico", productOrderedId: "6581ca399fd99c85e8ee7f45" }] };
let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginData);
    response = await apiUtils.createOrder(createOrderPayload);

});

test('Web AP', async ({ page }) => {
    page.addInitScript(value => {
        window.localStorage.setItem('token', value);
    }, response.token);
    await page.goto('https://rahulshettyacademy.com/client');
    const myOrders = page.locator("button[routerlink='/dashboard/myorders']");
    await myOrders.click();
    await page.locator('table.table-bordered').waitFor();
    const viewBtns = await page.$$('div.container.table-responsive button.btn-primary');
    const orders = await page.locator("tbody tr th[scope='row']").allTextContents();
    for (let i = 0; i < orders.length; i++) {
        const p = orders[i];
        console.log(`Printing order id: ${p}`);
        if (p === response.orderId) {
            console.log(`${p} matches with order id: ${response.orderId}`)
            await viewBtns[i].click();
            break;
        }

    }
    const orderSummaryId = await page.locator('div.col-text.-main').textContent();
    expect(orderSummaryId).toBe(response.orderId);
    await page.pause();


})