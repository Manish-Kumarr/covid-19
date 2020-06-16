const express = require('express')
const path = require('path')
var request = require("request");

const app = express()
const PORT = process.env.PORT || 5000

const publicDirectoryPath = path.join(__dirname,'../public')
app.use(express.static(publicDirectoryPath))

app.get('/covid', (req, res) => {
  const qs = {}

  if(req.query.qs){
    const parts = req.query.qs.split(':')
      parts[0] === '' ? qs :  qs.country =  parts[1]
  }

  var options = {
    method: 'GET',
    url: 'https://covid-193.p.rapidapi.com/statistics',
    qs,
    headers: {
      'x-rapidapi-host': 'covid-193.p.rapidapi.com',
      'x-rapidapi-key': 'ae35a16f0dmsh3272cea5d63e792p1ea0ccjsn62adc99aa962',
      useQueryString: true
    }
  };
  
  const covidAPI = (callback) => {
      request(options, function (error, response, body) {
          if (error){
              callback("Check your connection!",undefined)
          }else{
              callback(undefined, body)
          }
      });
  }

  covidAPI( (conn, body)=> {

    if(conn){
      return res.send({conn})
    }

    const data = JSON.parse(body)
    const len = (data.response).length

    const err = {}

    if(len === 0){
      err.error = "Please enter existing country"
    }
   
    res.send({
      data,
      err
    })
  })
})

app.listen(PORT, ()=>{
  console.log("Server run at port : ",PORT)
})