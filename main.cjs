const Apify = require('apify');
const axios = require('axios');
const cheerio = require('cheerio');

Apify.main(async () => {
    const url = 'https://www.forebet.com/en/football-predictions'; // example page
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    const predictions = [];

    $('.forecast-content .rcnt').each((i, el) => {
        const home = $(el).find('.homeTeam').text().trim();
        const away = $(el).find('.awayTeam').text().trim();
        const prediction = $(el).find('.prob span').first().text().trim();

        if (home && away && prediction) {
            predictions.push({ home, away, prediction });
        }
    });

    console.log('Predictions:', predictions);
    await Apify.pushData(predictions);
});
