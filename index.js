require('dotenv').config();
const {Telegraf} = require('telegraf');
//const { Composer } = require('micro-bot');
const puppeteer = require('puppeteer');

//my web scraper module
const scrape = require('./src/swagWebScraper.js')


const bot = new Telegraf(TOKEN);

/*
//trying microbot (includes Telegraf)
const bot = new Composer();
*/

//ngrok

//retrieving data from env variables
const{TOKEN, SERVER_URL} = process.env;

//ngrok webhook
const URI = `/webhook/${TOKEN}`;
const webhook = SERVER_URL+URI;



bot.catch((err, ctx) => {
    console.log(`Error ${ctx.updateType}`, err)
  })

let anime_manga;  


bot.start((ctx) => {

    bot.telegram.sendMessage(ctx.chat.id, 'Welcome to MangGet! What are you looking for?',
        {
            "reply_markup": {
                "resize_keyboard": true,
                "inline_keyboard": [
                    [
                        {text: "Anime", callback_data: '1'},
                        {text: "Manga", callback_data: '2'}
                    ]
                    
                ]
            }

        });
    
    
})

bot.action('1', ctx => {
    anime_manga = 1;
    console.log(anime_manga);
    ctx.reply("You have selected anime. Type the title.")
    }
)
bot.action('2', ctx => {
    anime_manga = 2;
    console.log(anime_manga);
    ctx.reply("You have selected manga. Type the title.")
    }
)
bot.on('message', (ctx) => {
    let query;

    if(anime_manga === 2){
    //*****MANGASEE*****
        
        //saving search query
        query = ctx.message.text.replaceAll(" ", "%20");
        query = "https://mangasee123.com/search/?name="+query;

        async function mangaSee(){
            //calling web scraper module
            let links = await scrape(query, 'https://mangasee123.com/manga/');
            let res = [];
            let manga_names = [];

            //checking if there are manga results
            if(await links.length === 0){
                ctx.reply('No manga has been found, try again');
            }

            else{
                //removing duplicate links
                res = await links.filter((v, i) => {
                    // checking if the index is odd
                    return i % 2 == 0;
                });

                //converting 2d array to 1d array (stupidly hardcoded way)
                string_links = [].concat.apply([], res);

                //
                string_links.forEach((link) => {
                    let name = link.replace('https://mangasee123.com/manga/',"");
                    //fixing the string from the link
                    name = name.replaceAll('-'," ");
                    name = name.replace('   '," - ");
                    manga_names.push(name);
                })

                await console.log(string_links);
                await console.log(manga_names);
                

                //INLINE KEYBOARD CREATION

                //buttons creation
                let buttons = [];

                for (let i = 0; i < manga_names.length; i++) {
                    let button = [{
                        "text": manga_names[i],
                        "url": string_links[i]
                    }]
                    buttons.push(button);
                }

                console.log(buttons);


                await bot.telegram.sendMessage(ctx.chat.id, 'Here is the list:',
                {
                    "reply_markup": {
                    "resize_keyboard": true,
                    "inline_keyboard": 
                        buttons
                    }
                });
            }
        }

        mangaSee();
    }

    else if(anime_manga === 1){
    //*****gogoanime*****
        query = ctx.message.text.replaceAll(" ", "%20");
        query = "https://gogoanime.tel/search.html?keyword="+query;

        async function anime(){
            //calling web scraper module
            let links = await scrape(query, "https://gogoanime.tel/category/");
            let res = [];
            let anime_names = [];

            //checking if there are anime results
            if(await links.length === 0){
                ctx.reply('No anime has been found, try again');
            }

            else{
                //removing duplicate links
                res = await links.filter((v, i) => {
                    // checking if the index is odd
                    return i % 2 == 0;
                });

                //converting 2d array to 1d array (stupidly hardcoded way)
                string_links = [].concat.apply([], res);

                //
                string_links.forEach((link) => {
                    let name = link.replace('https://gogoanime.tel/category/',"");
                    //fixing the string from the link
                    name = name.replaceAll('-'," ");
                    name = name.replace('   '," - ");
                    anime_names.push(name);
                })

                await console.log(string_links);
                await console.log(anime_names);
                

                //INLINE KEYBOARD CREATION

                //buttons creation
                let buttons = [];

                for (let i = 0; i < anime_names.length; i++) {
                    let button = [{
                        "text": anime_names[i],
                        "url": string_links[i]
                    }]
                    buttons.push(button);
                }

                console.log(buttons);


                await bot.telegram.sendMessage(ctx.chat.id, 'Here is the list:',
                {
                    "reply_markup": {
                    "resize_keyboard": true,
                    "inline_keyboard": 
                        buttons
                    }
                });
            }
        }

        anime();
    }

})

//***connection***

bot.launch({
    webhook: {
        domain:webhook,
        port: 5000
    }
})


/*
//***heroku connection using microbot***
module.exports = bot;
*/

    //The code below doesn't work because cheerio doesn't simulate the browser,
    //all that I get from that page scraping are variable names. 

    // request(query, (err, resp, body) => {

    //     $ = cheerio.load(body);
    //     links = $('a'); //jquery get all hyperlinks
    //     $(links).each(function(i, link){
    //       console.log($(link).text() + ':\n  ' + $(link).attr('href'));
    //     });
    // });


