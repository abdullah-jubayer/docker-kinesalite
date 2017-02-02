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

// This script allows us to trigger our lambda when a new event is detected
var moment = require("moment");
var AWS = require('aws-sdk')
var lambdaLocal = require('lambda-local');

var kinesis = new AWS.Kinesis({endpoint: 'http://kinesis:4567', region: 'us-east-1'})

setInterval(function () {
    kinesis.describeStream({
      StreamName: "events"
    }, function(err, data) {
      if (err) {
        console.log(err, err.stack);
        return;
      }

      kinesis.getShardIterator({
        StreamName: "events",
        ShardId: data.StreamDescription.Shards[0].ShardId,
        ShardIteratorType: "TRIM_HORIZON"
      }, function(err, data) {
        if (err) {
          console.log(err, err.stack);
          return;
        }
        kinesis.getRecords({
          ShardIterator: data.ShardIterator
        }, function(err, data) {
          if (err) {
            console.log(err, err.stack);
            return;
          }
          // This is not optimal but for this spike it's ok
          var buffer = data.Records[data.Records.length -1 ].Data
          var data = Buffer.from(buffer, 'base64').toString()
          // Call our lambda with lambda local
          lambdaLocal.execute({
            event: data,
            lambdaPath: '/app/lambda.js',
            lambdaHandler: 'handler'
          });
        });
      });
    });
}, 5000);