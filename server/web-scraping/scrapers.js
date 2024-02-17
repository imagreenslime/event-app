const puppeteer = require('puppeteer');
const events = []
const dateFunctions = require('./dateFunctions');
// placeholder is replaced with the index as it is what seperates the divs
// USPA WEBSITE CHANGED FIX THIS
const federationInfo = [
    {
    federation: "USPA", 
    link: 'https://www.uspa.net/upcoming-events/',
    name: '/html/body/div[2]/section[2]/div[2]/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/h3/a', 
    eventLink: '/html/body/div[2]/section[2]/div[2]/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/h3/a',
    address: '/html/body/div[2]/section[2]/div[2]/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/address/span[2]',
    date: '/html/body/div[2]/section[2]/div[2]/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/div/time/span',
},
    {
    federation: "USAPL",
    link: 'https://www.usapowerlifting.com/calendar/',
    name: '/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[1]/h4/a/span/div/div[2]',
    eventLink: "/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[2]/div/div/div[3]/a",
    address: '/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[2]/div/div/div[2]/text()[3]',
    date: '/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[1]/h4/a/span/div/div[3]'
},
{
    federation: "AMP",
    link: 'https://powerlifting-america.com/events/list/',
    name: '/html/body/div[1]/main/div/div/div[2]/div[placeholder]/div[2]/article/div[2]/header/h3/a',
    eventLink: '/html/body/div[1]/main/div/div/div[2]/div[placeholder]/div[2]/article/div[2]/header/h3/a',
    address: '/html/body/div[1]/main/div/div/div[2]/div[placeholder]/div[2]/article/div[2]/header/address/span[2]',
    date: '/html/body/div[1]/main/div/div/div[2]/div[placeholder]/div[2]/article/div[2]/header/div/time/span'
    },
{
    federation: "WRPF",
    link: 'https://www.thewrpf.com/events/list/',
    name: '/html/body/div[2]/div/div/main/article/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/h3/a',
    eventLink: '/html/body/div[2]/div/div/main/article/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/h3/a',
    address: '/html/body/div[2]/div/div/main/article/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/address/span[2]',
    state: '/html/body/div[2]/div/div/main/article/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/address/span[2]/span',
    date: '/html/body/div[2]/div/div/main/article/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/div/time/span',
}
]
const itemsPerFederation = 20;
async function scrapeProduct(federationInfo) {
    const browser = await puppeteer.launch({headless: "new"})
    const page = await browser.newPage()
    await page.goto(federationInfo.link);


    let eventsPerPage = await handleEventTotal(page, federationInfo.federation)

    console.log(`${federationInfo.federation} has ${eventsPerPage} events per page`)

    for (let i=1; i < itemsPerFederation; i++){
        let pageNumber = 1

        // handles is if text is on the next page
        let k = handleEventIteration(i, eventsPerPage);
        if (k % eventsPerPage == 1){
            pageNumber++
            await page.goto(federationInfo.link + `page/${pageNumber}/`);
        }
        console.log(k)
        let rawName, rawLink, rawAddress, rawDate, rawState = ""
        // get data
        rawName = await getText(page, federationInfo.name.replace("placeholder", k))
        rawLink = await getLink(page, federationInfo.eventLink.replace("placeholder", k))
        rawAddress = await getText(page, federationInfo.address.replace("placeholder", k))
        rawDate = await getText(page, federationInfo.date.replace("placeholder", k))

        if (federationInfo.state){
            rawState = await getText(page, federationInfo.state.replace("placeholder", k))
        }
        // if an event is multiple days then only obtain starting date
        if (rawDate.includes('-')){
            let arr = rawDate.split('-');
            rawDate = arr[0];
        }

        // enter data into listx
        switch (federationInfo.federation){
            case "USAPL":
                events.push({
                    federation: federationInfo.federation, 
                    name: rawName, 
                    state: rawAddress.slice(9),
                    date: dateFunctions.dateToNumber(rawDate),
                    link: rawLink
                })
                break;
            case "USPA":
                events.push({
                    federation: federationInfo.federation, 
                    name: rawName.trim(), 
                    state: rawAddress.split(',').slice(-3, -1).join(',').trim(),
                    date: dateFunctions.dateToNumber(dateFunctions.getCurrentYear(rawDate)),
                    link: rawLink
                })
                break;
            case "AMP":
                events.push({
                    federation: federationInfo.federation, 
                    name: rawName.trim(),
                    state: rawAddress.split(',').slice(-3, -1).join(',').trim(),
                    date: dateFunctions.dateToNumber(dateFunctions.getCurrentYear(rawDate)),
                    link: rawLink
                })
                break;    
            case "WRPF":
                events.push({
                    federation: federationInfo.federation, 
                    name: rawName.trim(),
                    state: rawState.split(':').slice(-1).join(',').trim(),
                    date: dateFunctions.dateToNumber(dateFunctions.getCurrentYear(rawDate)),
                    link: rawLink
                })
        }
    }
    console.log(`${federationInfo.federation} has been completed ${itemsPerFederation} items`)
    browser.close()
}

async function handleEventTotal(page, federation){
    let t1
    switch (federation){
        case "USPA":
        case "AMP":
            t1 = await page.$x('//div[@class="tribe-common-g-row tribe-events-calendar-list__event-row"]')
            return t1.length
        case "WRPF":
            t1 = await page.$x('//div[@class="tribe-common-g-row tribe-events-calendar-list__event-row"]')
            return t1.length + 1
        case "USAPL":
            t1 = await page.$x('//div[@class="vc_tta-panel"]')
            return t1.length
    }
}

function handleEventIteration(i, eventTotal){
    return (i % eventTotal) + 1
}

async function getText(page, xCode){
    // console.log(xCode);
    let [el] = await page.$x(xCode)

    let text = ""
    try {
        text = await el.getProperty('textContent')
    } catch (error){
        console.log(error, page)
        return text
    }
    return await text.jsonValue()
}

async function getLink(page, xCode){
    // console.log(xCode);
    let [el] = await page.$x(xCode)
    let text = ""
    try {
        text = await el.getProperty('href')
    } catch (error){
        console.log(error, page)
        return text
    }
    return await text.jsonValue()
}

async function initializeFederation(){
    for (let k=0; k < federationInfo.length; k++){
        await scrapeProduct(federationInfo[k])
    }
}

module.exports = { initializeFederation, events }



