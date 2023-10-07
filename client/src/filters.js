function filterDates(meetData){
    let t1 = meetData.sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    return t1
}

function filterStates(meetData, stateList){
    if (stateList.length > 0){
        let t1 = meetData.filter(i => stateList.includes(i.state.split(',').slice(-1).toString().trim(), 0)) // filter states
        return t1
    }
    return meetData
}

function filterFederations(meetData, federationList){
  if (federationList.length > 0){
      let t1 = meetData.filter(i => federationList.includes(i.federation, 0)) // filter states
      return t1
  }
  return meetData
}
function filterNames(meetData, search){
    let t1 = meetData.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
    return t1
}

function filterPages(meetData, page, itemsPerPage){
    let t1 = meetData.slice((page - 1) * itemsPerPage, page * itemsPerPage) // filter pages
    return t1
}


function setQueries(filters){
    let queryParameters = new URLSearchParams();
    for (const key in filters) {
        if (Array.isArray(filters[key])) {
          filters[key].forEach(value => {
            queryParameters.append(key, value);
          });
        } else {
            queryParameters.append(key, filters[key]);
        }
      }
    return queryParameters
}
export {filterDates, filterStates, filterNames, filterPages, setQueries, filterFederations}