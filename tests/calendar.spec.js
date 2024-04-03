const {test, expect} = require('@playwright/test');

test('pick a date', async ({page})=>{
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
    const monthNumber ='3';
    const date ='18';
    const year ='2028';
    await page.locator('div.react-date-picker__wrapper').click();
    await page.locator(' button span').click();
    await page.locator(' button span').click();
    const yearsText = await page.locator('.react-calendar__tile').allTextContents();
    const yearsBtns = await page.$$('.react-calendar__tile');
    
    for (let i = 0; i < yearsText.length; i++) {
        const x = yearsText[i];
        if (year == x) {
            console.log(`Year ${year} matches with ${x}`)
            await yearsBtns[i].click();
            break;
        }
        
    }
    const monthBtns = await page.$$('.react-calendar__year-view__months button');
    console.log(monthBtns.length)

    for(let i = 0; i < monthBtns.length; i++){
        const x = monthBtns[i];
        if (i == monthNumber - 1) {
            //console.log(`Monthnumber ${monthNumber} is equal to ${x}`)
            await monthBtns[i].click();
            break;
        }
    }
    const dayBtnsText = await page.locator('div.react-calendar__month-view__days button').allTextContents();
    const dateBtns = await page.$$('div.react-calendar__month-view__days button');
    console.log(dateBtns.length);
    for(let i = 0; i < dayBtnsText.length; i++){
        const x = dayBtnsText[i];
        console.log(`Date ${date} is equal to ${x}`)
        if (date == x) {
            console.log(`Date ${date} is equal to ${x}`)
            await dateBtns[i].click();
            break;
        }
    }
})