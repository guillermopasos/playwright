const {test, expect} = require('@playwright/test');


test.only('Popup validations', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://google.com');
    // await page.goBack();
    // await page.goForward();
    await page.locator('#name').fill('Memo');
    await page.locator('#confirmbtn').click();
    page.on('dialog',dialog => dialog.dismiss());
    await page.locator('#mousehover').hover();
    const framePage = page.frameLocator('#courses-iframe');
    await framePage.locator("a[href*='lifetime-access'].new-navbar-highlighter").click();
    await page.pause();
    const text = await framePage.locator("h2 span[style*='color']").textContent();
    console.log(text);



})