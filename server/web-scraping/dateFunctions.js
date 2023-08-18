function getCurrentYear(date){
    let newDate = new Date();
    if (newDate.getMonth() <= new Date(date + ", 2023").getMonth()){
        return `${date}, ${newDate.getFullYear()}`;
    } else {
        return `${date}, ${newDate.getFullYear() + 1}`;
    }
    
}

function dateToNumber(date) {
    let newDate = new Date(date)
    return `${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()}`
}

module.exports = { getCurrentYear, dateToNumber};