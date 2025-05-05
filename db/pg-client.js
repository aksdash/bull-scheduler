require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
const {Client} = require('pg')

console.log(process.env.PG_DATABASE)


module.exports.getClient = async() => {
    const client = new Client({
        user : process.env.PG_USER,
        database : process.env.PG_DATABASE,
        port : process.env.PG_PORT,
        host : process.env.PG_HOST,
        password: process.env.PG_PASSWORD,
        boolean : false
    })
  await client.connect()
  return client
}