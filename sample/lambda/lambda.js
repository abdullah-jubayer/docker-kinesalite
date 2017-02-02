// This is the code of our lambda
// Here we just display the content of the event
exports.handler = function(event, context) {
  console.log('Consuming event: ' + event)
}