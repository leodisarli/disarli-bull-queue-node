const Bull = require('bull');

const queue = new Bull('test-queue', {
  redis: {
    host: 'localhost',
    port: 6379,
    maxRetriesPerRequest: null,
    enableReadyCheck: false,
  }
});

queue.on('error', function (error) {
  console.log(`Queue ${queue.name} - error: ${error} `);
});

queue.on('failed', function (job, error) {
  console.log(`Queue ${queue.name} - Job ${job.id} failed: ${error} `);
});

queue.process('single', async (job) => {
  var success = true;
  var jobError = '';
  console.log(`Queue ${queue.name} - Job ${job.id} started`);
  console.log(job.data);
  console.log(`Queue ${queue.name} - Job ${job.id} finished`);
  if (success) {
    return 'success';
  }
  throw Error(jobError);
});