const federationInfo = [
    {federation: "USPA", 
    link: 'https://uspa.net/upcoming-events/',
    name: `/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[${i}]/div[2]/article/div/header/h3/a`, 
    gym: `/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[${i}]/div[2]/article/div/header/address/span[1]`,
    address: `/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[${i}]/div[2]/article/div/header/address/span[2]`,
    date: `/html/body/div[2]/div/div/section[2]/div[2]/div/div/div/div/div/div/div/div/div[2]/div[${i}]/div[2]/article/div/header/div/time/span`,
}
]

module.exports = federationInfo