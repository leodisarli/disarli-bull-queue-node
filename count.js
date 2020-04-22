var Bull = require('bull');

var queue = new Bull("test-queue");

queue.count().then(total => {
  console.log(total);
  process.exit();
});