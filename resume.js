var Bull = require('bull');

var queue = new Bull("test-queue");

queue.resume().then(() => {
  console.log('resume ok');
  process.exit();
});
