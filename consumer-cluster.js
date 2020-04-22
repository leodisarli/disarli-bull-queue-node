const Bull = require('bull');
const cluster = require('cluster');

const args = process.argv.slice(2);
const numWorkers = Number(args[0]) || 2;

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

if (cluster.isMaster) {
  for (var i = 0; i < numWorkers; i++) {
    cluster.fork();
  }

  cluster.on('exit', function (worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
  });
} else {
  queue.process('single', async (job) => {
    var success = false;
    var jobError = '';
    console.log(`Worker: ${cluster.worker.id} - Queue ${queue.name} - Job ${job.id} started`);
    console.log(job.data);
    console.log(`Worker: ${cluster.worker.id} - Queue ${queue.name} - Job ${job.id} finished`);
    if (success) {
      return 'success';
    }
    throw Error(jobError);
  });
}

