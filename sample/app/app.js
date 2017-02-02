/* Handle signals
* see: https://github.com/nodejs/node-v0.x-archive/issues/9131
*/
exitOnSignal('SIGINT');
exitOnSignal('SIGTERM');

function exitOnSignal(signal) {
  process.on(signal, function() {
    console.log('\ncaught ' + signal + ', exiting');
    // perform all required cleanup
    process.exit(0);
  });
}

var moment = require("moment");
var AWS = require('aws-sdk')
var kinesis = new AWS.Kinesis({endpoint: 'http://kinesis:4567', region: 'us-east-1'})

setInterval(function () {
  var event = {
    datetime: moment.utc().format(),
    event: 'New event'
  }
  const line = JSON.stringify(event);
  kinesis.putRecord({
    Data : new Buffer(line),
    PartitionKey : 'xyz',
    StreamName: 'events'
  }, (err, data) => {
    if (err) console.log('error', err);
    console.log('Sending event:', event );
  });
}, 5000);