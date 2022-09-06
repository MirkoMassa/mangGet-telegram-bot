# mangGet
<div align="center">

 <h3 align="left">Description of the project</h3>

  <p align="left">
    A simple node.js based telegram bot which takes data from https://mangasee123.com/ and https://gogoanime.tel/ and returns the resulting links, by typing the desired title.
    <br>
  </p>
</div>

### Built with

* [![Node][Node.js]][Nodejs-url]
* [![Telegram]][Telegram]   API


### How I've worked
  The page scraping is done with puppeteer. The bot part is mainly done with Telegram API. I've partially used telegraf for code simplicity.
.<br><br>

### Examples
  Getting anime <br><br>
  ![Alt Text](https://media4.giphy.com/media/HUoJb3xb75YZ97Ii0W/giphy.gif)
  <br>
  Getting manga <br><br>
  ![Alt Text](https://media4.giphy.com/media/SmOAWktFcsWXo4TxgH/giphy.gif)



[Node.js]: https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white
[Nodejs-url]: https://nodejs.org/it/
[Telegram]:https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white

# Todo list

* Make a better UX, since inline buttons are not perfect (it could be better if they disappear after choosing between anime or manga)
* Add more sources and more modularity to the project, some functions are hardcoded
