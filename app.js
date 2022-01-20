const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const app = express();
const PORT = 3000;

const url = 'https://darksouls2.wiki.fextralife.com/';

const categories = [
"daggers",
"straight swords",
"greatswords",
"ultra greatswords",
"curved swords",
"katanas",
"curved greatswords",
"piercing swords",
"axes",
"great axes",
"hammers",
"great hammers",
"fist weapons",
"spears",
"halberds",
"lances",
"reapers",
"twinblades",
"whips",
"bows",
"greatbows",
"crossbows",
"flames",
"chimes",
"staves"
]

categories.forEach(function(weapon){
  axios(url + weapon)
    .then(res => {
      const html = res.data;
      const $ = cheerio.load(html);

      $('tr', html).each(function(){
        const weapon = $(this).find('.wiki_link:first').text();
        const uri = 'https://darksouls2.wiki.fextralife.com' + $(this).find('img').attr('src');
        const str = $(this).find('td:eq(8)').text().split(" ", 2);
        const dex = $(this).find('td:eq(9)').text().split(" ", 2);
        const int = $(this).find('td:eq(10)').text().split(" ", 2);
        const fth = $(this).find('td:eq(11)').text().split(" ", 2);
        const text = $(this).find('td:eq(15)').text();

        if (weapon !== '') {
          const item = ({
            title: weapon,
            link: uri,
            statReq: {
              strength: str[0],
              dexterity: dex[0],
              intelligence: int[0],
              faith: fth[0]
            },
            statScal: {
              strength: str[1],
              dexterity: dex[1],
              intelligence: int[1],
              faith: fth[1]
            },
            flavorText: text
          });
          console.log(item);
        }
      });
    }).catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log("server listening on port 3000");
});
