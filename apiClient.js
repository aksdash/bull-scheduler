const axios = require('axios')

async function getApiCall(){
    axios.get('https://fake-json-api.mock.beeceptor.com/users')
    .then(res => {
    console.log(res.data)
    return res.data
    })
    .catch(err => {
    console.log(err)
     throw err
}   )
}


module.exports = {getApiCall}

