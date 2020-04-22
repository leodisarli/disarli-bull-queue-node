var Bull = require('bull');

var queue = new Bull("test-queue");

queue.pause().then(() => {
  console.log('pause ok');
  process.exit();
});
