var Bull = require('bull');

var queue = new Bull("test-queue");

queue.on('global:paused', function () {
  console.log(`Queue ${queue.name} is paused`);
});

queue.on('global:resumed', function () {
  console.log(`Queue ${queue.name} is resumed`);
});

queue.on('global:waiting', function (jobId) {
  console.log(`Queue ${queue.name} - Job ${jobId} is waiting `);
});

queue.on('global:active', function (jobId) {
  console.log(`Queue ${queue.name} - Job ${jobId} is active `);
});

queue.on('global:stalled', function (jobId) {
  console.log(`Queue ${queue.name} - Job ${jobId} stalled `);
});

queue.on('global:progress', function (jobId, progress) {
  console.log(`Queue ${queue.name} - Job ${jobId} progress is ${progress}`);
});

queue.on('global:completed', function (jobId, result) {
  console.log(`Queue ${queue.name} - Job ${jobId} completed with status ${result}`);
});

queue.on('global:failed', function (jobId, error) {
  console.log(`Queue ${queue.name} - Job ${jobId} failed: ${error} `);
});

queue.on('global:removed', function (jobId) {
  console.log(`Queue ${queue.name} - Job ${jobId} removed`);
});
