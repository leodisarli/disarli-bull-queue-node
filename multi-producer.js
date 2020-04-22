const Bull = require('bull');
var Ulid = require('ulid');
const queue = new Bull("test-queue");

const args = process.argv.slice(2);
const jobs = Number(args[0]) || 10;

async function multiAdd() {
  for (let index = 0; index < jobs; index++) {
    await queue.add(
      'single',
      { table: 'hubble.access_economy_report' },
      {
        removeOnComplete: 100,
        attempts: 3, 
        backoff: 5000,
        jobId: Ulid.ulid(),
      }
    );
  }
  console.log('multiple job');
  process.exit();
}

multiAdd();
