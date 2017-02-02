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

// Returns a standard Node.js HTTP server
var kinesalite = require('kinesalite'),

server = kinesalite({path: '/db', createStreamMs: 50})

// Listen on port 4567
server.listen(4567, function(err) {
  if (err) throw err
  console.log('Kinesalite started on port 4567')
})