var Bull = require('bull');
var Ulid = require('ulid');

var queue = new Bull("test-queue");

queue.add(
  'single',
  {
    table: 'hubble.access_economy_report',
    db_host: 'localhost',
  },
  {
    removeOnComplete: 100,
    attempts: 3, 
    backoff: 5000,
    jobId: Ulid.ulid(),
  }
).then(() => {
  console.log('single job');
  process.exit();
});