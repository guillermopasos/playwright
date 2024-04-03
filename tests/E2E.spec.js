const {test, expect} = require('@playwright/test');
const { text } = require('node:stream/consumers');


test('End to End scenario', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/client');
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
    await page.locator("//input[@value='4542 9931 9292 2293']").waitFor();
    await personalInformation('4111111111111111', '02', '25','123','Memo');
    const country = page.locator("input[placeholder='Select Country']");
    await country.pressSequentially('mex');
    const mexico = page.locator('span.ng-star-inserted');
    await mexico.click();
    const email = await page.locator("label[type='text']").textContent();
    expect(email).toBe('memopasos@hotmail.com')
    const placeOrder = page.locator('a.action__submit');
    await placeOrder.click();
    await expect(page.locator('.hero-primary')).toBeVisible();
    const orderId = await page.locator('label.ng-star-inserted').textContent();
    const subOrderId = orderId.substring(3,27);
    console.log(subOrderId);
    const myOrders = page.locator("button[routerlink='/dashboard/myorders']");
    await myOrders.click();
    await page.locator('table.table-bordered').waitFor();
    const viewBtns = await page.$$('div.container.table-responsive button.btn-primary');
    const orders = await page.locator("tbody tr th[scope='row']").allTextContents();
    console.log(`Number of orders displayed: ${orders.length}`);
    console.log(`Orders: ${orders}`);
    for (let i = 0; i < orders.length; i++) {
        const p = orders[i];
        console.log(`Printing order id: ${p}`);
        if (p === subOrderId) {
            console.log(`${p} matches with order id: ${subOrderId}`)
            await viewBtns[i].click();
            break;
        }
        
    }
    const orderSummaryId = await page.locator('div.col-text.-main').textContent();
    expect(orderSummaryId).toBe(subOrderId);
    await page.pause();
    //tbody tr th[scope='row']



    async function personalInformation(creditCard, month, year, cvv, name){
        await page.locator("//input[@value='4542 9931 9292 2293']").fill(creditCard);
        await page.locator("//body//app-root//select[1]").selectOption(month)
        await page.locator("//body//app-root//select[2]").selectOption(year);
        await page.locator("(//input[@type='text'])[2]").fill(cvv);
        await page.locator("(//input[@type='text'])[3]").fill(name);
    }
    
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
                    //test
                    break;
                }
            }  
    } 
})