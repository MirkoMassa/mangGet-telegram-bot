/*
    page scraper created by me using puppeteer, simulating the browser
    to access <a href=...> elements. The last part of the script removes
    duplicates and useless links.
    
*/

const puppeteer = require('puppeteer');


module.exports = async function scrape (query, inclusion) {

    //using puppeteer to recreate the result page
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(query);

    //getting an array of <a href = ...> elements
    const findLinks = await page.evaluate(() =>
        Array.from(document.querySelectorAll("a")).map((info) => ({
            information: info.href.split()
        }))
        );
        //empty array to store just the links 
        const links = [];

        //storing only userful links
        findLinks.forEach((link) => {

            if (link.information.length) {
                link.information.find(element => {

                    if (element.includes(inclusion)) {
                        links.push(link.information);
                    }

                    else return;
                })  
            }
            
        });
        
        await console.log(links);
        await page.close();
        return links;
}

