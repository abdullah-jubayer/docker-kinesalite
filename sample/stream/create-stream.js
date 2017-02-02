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

// This script allows us to create a Kinesis stream
var AWS = require('aws-sdk')

var kinesis = new AWS.Kinesis({endpoint: 'http://kinesis:4567', region: 'us-east-1'})

// TODO check the stream already exists
kinesis.describeStream({
  StreamName: "events"
}, function(err, data) {
  if (err) {
    var params = {
      ShardCount: 1,
      StreamName: 'events'
    };

    kinesis.createStream(params, function(err, data) {
      if (err) console.log(err, err.stack); // an error occurred
      else     console.log(data);           // successful response
    });
  }
});
