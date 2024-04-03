const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test.only('End to End scenario', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client')
    login('memopasos@hotmail.com', 'Test1234',page);
    await page.locator('#products .col-lg-4 b').first().waitFor();
    const desiredProduct = 'ZARA COAT 3';
    const productTitles = await page.locator('#products .col-lg-4 b').allTextContents();
        console.log(productTitles);
        const addToCartBtns = await page.$$('.container button:last-child i');
        console.log(`This is the all of the buttons lenght ${addToCartBtns.length}`);
            for (let i = 0; i < productTitles.length; i++) {
                const product = productTitles[i];
                if (product == desiredProduct) {
                    console.log(`This is comparison between ${product} and ${desiredProduct}`);
                    await addToCartBtns[i].click();
                    break;
                }
            }
    const cartBtn = page.locator("button[routerlink='/dashboard/cart']")
    cartBtn.click();
    //await page.pause();
    const cartProduct = await page.locator('div .cartSection h3').textContent();
    console.log(`Printing: ${cartProduct} is equal to: ${desiredProduct}`)
    expect(cartProduct).toBe(desiredProduct);
    const checkoutBtn = page.locator('.totalRow button');
    await checkoutBtn.click();
    
    //await page.pause();
    
    async function login(user, pass){
        const username = page.locator('#userEmail');
        const password = page.locator('#userPassword');
        const signInBtn = page.locator('#login');
        await username.fill(user);
        await password.fill(pass);
        await signInBtn.click();
    }

    async function addToCart(productToAdd){
        const productTitles = await page.locator('#products .col-lg-4 b').allTextContents();
        console.log(productTitles);
        const addToCartBtns = await page.$$('.container button:last-child i');
        console.log(`This is the all of the buttons lenght ${addToCartBtns.length}`);
            for (let i = 0; i < productTitles.length; i++) {
                const product = productTitles[i];
                if (product == productToAdd) {
                    console.log(`This is comparison between ${product} and ${productToAdd}`);
                    await addToCartBtns[i].click();
                    break;
                }
            }  
    } 
})