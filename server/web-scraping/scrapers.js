const puppeteer = require('puppeteer');
const events = []

// placeholder is replaced with the index as it is what seperates the divs
const federationInfo = [
    {
    federation: "USPA", 
    link: 'https://uspa.net/upcoming-events/',
    name: '/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/h3/a', 
    gym: '/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/address/span[1]',
    address: '/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/address/span[2]',
    date: '/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[placeholder]/div[2]/article/div/header/div/time/span',
},
    {
    federation: "USAPL",
    link: 'https://www.usapowerlifting.com/calendar/',
    name: '/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[1]/h4/a/span/div/div[2]',
    gym: '/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[2]/div/div/div[2]/text()[3]',
    date: '/html/body/div[3]/div/div[2]/div/div[1]/div/div/div/div/div/div/div/div/div/div/div[placeholder]/div[1]/h4/a/span/div/div[3]'
}
]

async function scrapeProduct(federationInfo) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(federationInfo.link);

    for (let i=1; i < 16; i++){
        let rawName = "";
        let rawGym = "";
        let rawAddress = "";
        let rawDate = "";
        if (federationInfo.name){
            rawName = await getText(page, federationInfo.name.replace("placeholder", i))
        }
        if (federationInfo.gym){
            rawGym = await getText(page, federationInfo.gym.replace("placeholder", i))
        }
        if (federationInfo.address){
            rawAddress = await getText(page, federationInfo.address.replace("placeholder", i))
        }
        if (federationInfo.date){
            rawDate = await getText(page, federationInfo.date.replace("placeholder", i))
        }
        if (federationInfo.federation == "USPA"){
            events.push({
                federation: federationInfo.federation, 
                name: rawName.slice(1, -1), 
                where: `${ rawGym.slice(1, -1) } ${ rawAddress.slice(1, -1) }`, 
                when: rawDate
            })
        } else {
            events.push({
                federation: federationInfo.federation, 
                name: rawName.slice(1, -1), 
                where: `${rawGym} ${rawAddress}`, 
                when: rawDate
            })
        }
    }

    browser.close()
}

async function getText(page, xCode){
    let [el] = await page.$x(xCode)
    let text = await el.getProperty('textContent')
    return await text.jsonValue()
}

async function initializeFederation(){
    for (let k=0; k < federationInfo.length; k++){
        await scrapeProduct(federationInfo[k])
    }
}

module.exports = { initializeFederation, events }



