var Bull = require('bull');

var queue = new Bull("test-queue");

queue.removeRepeatableByKey(
  'repeat:::1000'
).then(() => {
  console.log('remove repeat ok');
  process.exit();
});
