var Bull = require('bull');

const args = process.argv.slice(2);
const jobs = Number(args[0]) || 0;

var queue = new Bull("test-queue");

queue.getFailed(0, jobs).then(async failedJobs => {
  for (const job of failedJobs) {
    try {
      console.log(`retring ${job.id}`)
      await job.retry();
    } catch (error) {
      console.log(error);
    }
  }
  process.exit();
});