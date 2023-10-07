
test = [{hello: "a"}, {hello: "b"}, {hello: "a"}, {hello: "c"}, {hello: "b"}]
const uniqueEvents = [];
test.forEach(event => { // the argument passed to the callback stores the current item
  let unique = true;
  uniqueEvents.forEach(uniqueEvent => {
    if (uniqueEvent.hello == event.hello){
      unique = false;    
    }
  });
  if(unique){
    uniqueEvents.push(event);
  }
});