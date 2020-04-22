var Bull = require('bull');
var Ulid = require('ulid');

var queue = new Bull("test-queue");

queue.add(
  'repeat',
  { foo: 'bar' },
  {
    repeat: {
      every: 1000,
      limit: 100
    },
    removeOnComplete: 100,
    attempts: 3, 
    backoff: 5000,
    jobId: Ulid.ulid(),
  }
).then(() => {
  console.log('repeat ok');
  process.exit();
});
