const {Worker} = require('bullmq')
const {connection} = require('./redisConnection.js')
const {getApiCall} = require('./apiClient.js')

const worker = new Worker('myQueue', async(job) => {
    console.log(`Hello, ${job.data.report_id}!`);
    try {
        await getApiCall()
    }catch(err){
        throw(err)
        console.log('error happened')
    }
}, {connection})


worker.on('completed', (job) => {
    console.log(job.data)
    console.log(`Job ${job.name}  ${job.attemptsMade + 1}has been completed!`);
  });
  
  worker.on('failed', (job, err) => {
    console.error(`Job ${job.report_id} has failed with error ${err.message}`);
  });