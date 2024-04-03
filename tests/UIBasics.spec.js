const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');

test('Validate Login error message', async ({page})=>
{
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const loginErrorMsg = page.locator('#login-box .alert');
    await username.fill('Memouva');
    await password.fill('holamundo');
    await signInBtn.click();
    console.log(await loginErrorMsg.textContent());
    await expect(loginErrorMsg).toHaveText('Incorrect username/password.')
    await expect(loginErrorMsg).toBeVisible();
   //await expect(page).toHaveTitle('Google')
})
test('Validate landing page', async ({page})=>
{
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/')
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    await username.fill('rahulshettyacademy');
    await password.fill('learning');
    await signInBtn.click();
    const firstLabel = page.locator('app-card-list app-card:first-child .card-title');
    console.log(await page.locator('.row app-card:first-child').textContent());
    const allTitles = page.locator('.row app-card .card-title a');
    const allTitlesText = await allTitles.allTextContents();
    await expect(firstLabel).toBeVisible();
    console.log(allTitlesText);
    console.log(allTitlesText[0]);
});

test('Validate second login', async ({page})=>
{
    await page.goto('https://rahulshettyacademy.com/client')
    const username = page.locator('#userEmail');
    const password = page.locator('#userPassword');
    const signInBtn = page.locator('#login');
    await username.fill('memopasos@hotmail.com');
    await password.fill('Test1234');
    await signInBtn.click();
    //await page.waitForLoadState('networkidle'); // Wait for all the elements to be loaded.
    await page.locator('#products .col-lg-4 b').first().waitFor(); //wait for an specific locator to load.
    const productTitles = await page.locator('#products .col-lg-4 b').allTextContents();
    console.log(productTitles);
    // const firstTitle = await page.locator('#products .col-lg-4:first-child b');
    // console.log(await firstTitle.textContent());
});

test('UI Controls', async ({page})=>{
    
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    await username.fill('memopasos@hotmail.com');
    await password.fill('Test1234');
    const dropDown = page.locator('select.form-control');
    await dropDown.selectOption('teach');
    // const loginErrorMsg = await page.locator('#login-box .alert');
    // await expect(loginErrorMsg).toBeVisible();
    // Select radio button
    const okayBtn = page.locator('#okayBtn');
    const userRdio = page.locator('input[value="user"]');
    const termschbx = page.locator('#terms');
    //await page.waitForLoadState('networkidle');
    await userRdio.click();
    await okayBtn.click();
    await termschbx.click();
    await expect(userRdio).toBeChecked();
    await expect(termschbx).toBeChecked();
    const blinkTxt = page.locator('a[href*="documents-request"]')
    await expect(blinkTxt).toHaveAttribute('class','blinkingText');
    console.log(await userRdio.isChecked());
    console.log(await termschbx.isChecked());
});

test('Child windows', async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.rahulshettyacademy.com/loginpagePractise/');
    const blinkTxt = page.locator('a[href*="documents-request"]')

    const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        blinkTxt.click(),
    ])

    //console.log(await newPage.locator('strong a').textContent())
    const mailToSplit = await newPage.locator('strong a').textContent();
    const newText = mailToSplit.split('@');
    const newUser = newText[1];
    const username = page.locator('#username');
    const password = page.locator('#password');
    await username.fill(newUser);
    console.log(await username.textContent());
    //await page.pause();


    
} )
