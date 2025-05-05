require('dotenv').config()
const { Queue } = require('bullmq');
const { connection } = require('./redisConnection');
const {getClient} = require('./db/pg-client')
var cron = require('node-cron')

//Creating a queue
const myQueue = new Queue('myQueue', {connection : connection } )

  console.log(cron.validate('*/5 * * * * *'))

  cron.schedule(' */10 *  *  *  *  *', async () => {
    console.log('running take every 1 minute')
    addJobTotheQueue()
  
  })

  // addition of Job to the queue...
  async function addJobTotheQueue(){
    try{
        const results = await getReportMetaData()
        for (const data of results){
            console.log(data)
          await myQueue.add(`${data.report_id}`,data,{
            attempts : 2,
            backoff : {
                type : 'exponential',
                delay : 1000
            },
            removeOnComplete : true,
            removeOnFail : false
          })
          console.log(`Added job: ${data.report_id}`);
        }
      }catch(err){
          console.log(err)
          // Do nothing ...
      }
  }

async function getReportMetaData(){
 const client = await getClient()
  let reportQuery = `SELECT * FROM REPORT_SCHEDULERS`
  try {
    const res = await client.query(reportQuery)
     console.log(res.rows)
     return res.rows
  }catch(err){
    console.log(err)
    throw err
  }
  
  await client.end()
}


addJobTotheQueue()





