
const scrapers = require('./scrapers.js')

scrapers.scrapeProduct('https://uspa.net/upcoming-events/').then(() => (
    console.log(scrapers.events)
))