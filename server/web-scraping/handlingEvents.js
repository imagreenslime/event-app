const scrapers = require('./scrapers.js');
const meetModel = require('../models/Meet.js');

function makeUniqueNames(oldList){
    const newList = [];
    oldList.forEach(oldElement => { // the argument passed to the callback stores the current item
        let unique = true;
        newList.forEach(newElement => {
            if (oldElement.name == newElement.name){
            unique = false;    
            }
        });
        if(unique){
            newList.push(oldElement);
        }
    });
    return newList
}
async function handleEvents(event){
    let exists = await meetModel.findOne({"name": event.name})
    if (exists){
        console.log("duplicate")
        return;
    }
    const newMeet = new meetModel({federation: event.federation, name: event.name, state: event.state, address: event.address, date: event.date, link: event.link});
    newMeet.save()
    .then(() => console.log(`meet added: ${event.name}`)) 
    .catch(err => console.log('error: ' + err));

}

function deleteEvents(){
    meetModel.deleteMany({}).then(console.log("hello"));
}
function initializeEvents(){
    scrapers.initializeFederation().then(() => {
        let newEvents = makeUniqueNames(scrapers.events)
        newEvents.forEach((event) => { 
            handleEvents(event);
        })
    })
}

module.exports = { initializeEvents, deleteEvents }