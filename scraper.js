/// @author Chris Catechis
/// @date 2/10/2022
/// this is a work in progress.


const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const [el] = await page.$x('/html/body/div[2]/main/div/div[2]/div[2]/div/div[1]/button/img');  // x is a puppeteer function, way to navigate a page. 
    const src = await el.getProperty('src');
    const imgURL = await src.jsonValue();
    
    const [el2] = await page.$x('/html/body/div[2]/main/div/div[2]/div[3]/div[1]/div[2]/h1/span[2]');  // x is a puppeteer function, way to navigate a page. 
    const txt = await el2.getProperty('textContent');
    const title = await txt.jsonValue();

    const [el3] = await page.$x('/html/body/div[2]/main/div/div[2]/div[3]/div[2]/div/span');  // x is a puppeteer function, way to navigate a page. 
    const txt2 = await el3.getProperty('textContent');
    const price = await txt2.jsonValue();

    console.log({imgURL, title, price});

    browser.close();
}

scrapeProduct('https://www.backcountry.com/lib-technologies-t.rice-orca-snowboard');